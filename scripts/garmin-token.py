"""Generate fresh Garmin DI OAuth credentials for the Hobby page.

Usage:
    py -m pip install --upgrade garminconnect curl_cffi
    py scripts/garmin-token.py

Prompts for your Garmin email, password (hidden) and MFA code if enabled,
then prints GARMIN_DI_REFRESH_TOKEN and GARMIN_DI_CLIENT_ID for .env.local
and Vercel. Nothing is written to this repo.
"""

import base64
import json
from getpass import getpass
from pathlib import Path

from garminconnect import Garmin

TOKEN_DIR = Path.home() / ".garminconnect"


def jwt_claims(token: str) -> dict:
    try:
        payload = token.split(".")[1]
        payload += "=" * (-len(payload) % 4)
        return json.loads(base64.urlsafe_b64decode(payload))
    except Exception:
        return {}


def find(data, predicate):
    """Depth-first search for the first string value whose key matches."""
    if isinstance(data, dict):
        for k, v in data.items():
            if isinstance(v, str) and predicate(k.lower()):
                return v
            found = find(v, predicate)
            if found:
                return found
    return None


def main() -> None:
    email = input("Garmin email: ").strip()
    password = getpass("Garmin password: ")
    client = Garmin(email, password, prompt_mfa=lambda: input("MFA code: ").strip())
    client.login(str(TOKEN_DIR))

    token_file = TOKEN_DIR / "garmin_tokens.json"
    data = json.loads(token_file.read_text())

    refresh = find(data, lambda k: "refresh" in k and "expires" not in k)
    client_id = find(data, lambda k: "client_id" in k)
    if not client_id:
        access = find(data, lambda k: "access" in k or k.endswith("token"))
        client_id = jwt_claims(refresh or "").get("client_id") or jwt_claims(access or "").get("client_id")

    if not refresh or not client_id:
        print(f"\nCouldn't pick the values out automatically. Token file keys: {list(data)}")
        print(f"Open {token_file} and look for the refresh token and client id.")
        return

    print("\nPaste these into .env.local and Vercel (Settings -> Environment Variables):\n")
    print(f"GARMIN_DI_REFRESH_TOKEN={refresh}")
    print(f"GARMIN_DI_CLIENT_ID={client_id}")


if __name__ == "__main__":
    main()
