import type { Checkpoint } from "../lib/last-good";
import type { MonthVolume } from "../lib/training-volume";

export interface GarminStats {
  outdoorBests: Record<string, number | null>;
  treadmillBests: Record<string, number | null>;
  months: MonthVolume[];
}

// Last known-good Garmin pull, committed so the Hobby page always has
// something to show — even on a fresh deploy with an empty data cache while
// Garmin is unreachable. Refresh it now and then by pasting in a newer result.
export const GARMIN_SNAPSHOT: Checkpoint<GarminStats> = {
  "fetchedAt": "2026-09-28T17:37:43.232Z",
  "data": {
    "outdoorBests": {
      "100m": 14.15051219450811,
      "400m": 78,
      "half-mile": 179.48328232632196,
      "1k": 227.98098528173716,
      "mile": 448.1178562294129,
      "2mile": 928.6735882985588,
      "5k": 1464.0752537626881,
      "10k": 3205.8696296296293,
      "15k": 4895,
      "10mile": 5263,
      "20k": 6640.473888888889,
      "half-marathon": 7045
    },
    "treadmillBests": {
      "100m": 25.235310646269113,
      "400m": 102.25254845205131,
      "half-mile": 207.25316492129775,
      "1k": 258.1592401351437,
      "mile": 417.8714411935672,
      "2mile": 876.5773307511413,
      "5k": 1395.737452264048,
      "10k": null,
      "15k": null,
      "10mile": null,
      "20k": null,
      "half-marathon": null
    },
    "months": [
      {
        "key": "2026-09",
        "label": "September 2026",
        "sessions": 12,
        "durationSeconds": 79182.03802490234,
        "distanceKm": 137.11933129882811,
        "bySport": [
          {
            "category": "hiking",
            "label": "Hiking",
            "sessions": 2,
            "durationSeconds": 45367.341796875,
            "distanceKm": 27.23305078125
          },
          {
            "category": "cycling",
            "label": "Cycling",
            "sessions": 5,
            "durationSeconds": 20299.47509765625,
            "distanceKm": 74.98408984375
          },
          {
            "category": "running",
            "label": "Running",
            "sessions": 5,
            "durationSeconds": 13515.221130371094,
            "distanceKm": 34.90219067382812
          }
        ]
      },
      {
        "key": "2026-08",
        "label": "August 2026",
        "sessions": 12,
        "durationSeconds": 78222.25164794922,
        "distanceKm": 72.25960070800781,
        "bySport": [
          {
            "category": "other",
            "label": "Other",
            "sessions": 5,
            "durationSeconds": 56430.000732421875,
            "distanceKm": 39.83098095703125
          },
          {
            "category": "hiking",
            "label": "Hiking",
            "sessions": 1,
            "durationSeconds": 9887.291015625,
            "distanceKm": 9.8248701171875
          },
          {
            "category": "running",
            "label": "Running",
            "sessions": 3,
            "durationSeconds": 7680.8189697265625,
            "distanceKm": 20.0188896484375
          },
          {
            "category": "swimming",
            "label": "Swimming",
            "sessions": 2,
            "durationSeconds": 3863.81591796875,
            "distanceKm": 2.5848599853515624
          },
          {
            "category": "strength",
            "label": "Strength",
            "sessions": 1,
            "durationSeconds": 360.32501220703125,
            "distanceKm": 0
          }
        ]
      },
      {
        "key": "2026-07",
        "label": "July 2026",
        "sessions": 16,
        "durationSeconds": 58362.66760253906,
        "distanceKm": 85.60748950195313,
        "bySport": [
          {
            "category": "other",
            "label": "Other",
            "sessions": 5,
            "durationSeconds": 32275.46240234375,
            "distanceKm": 19.231469970703124
          },
          {
            "category": "running",
            "label": "Running",
            "sessions": 11,
            "durationSeconds": 26087.205200195312,
            "distanceKm": 66.37601953125
          }
        ]
      },
      {
        "key": "2026-06",
        "label": "June 2026",
        "sessions": 23,
        "durationSeconds": 70726.26922607422,
        "distanceKm": 116.62325122070312,
        "bySport": [
          {
            "category": "running",
            "label": "Running",
            "sessions": 12,
            "durationSeconds": 21730.210021972656,
            "distanceKm": 57.748670776367184
          },
          {
            "category": "other",
            "label": "Other",
            "sessions": 4,
            "durationSeconds": 21647.30224609375,
            "distanceKm": 7.59902001953125
          },
          {
            "category": "strength",
            "label": "Strength",
            "sessions": 3,
            "durationSeconds": 14616.9130859375,
            "distanceKm": 0
          },
          {
            "category": "cycling",
            "label": "Cycling",
            "sessions": 3,
            "durationSeconds": 11819.936889648438,
            "distanceKm": 50.7746904296875
          },
          {
            "category": "swimming",
            "label": "Swimming",
            "sessions": 1,
            "durationSeconds": 911.906982421875,
            "distanceKm": 0.5008699951171875
          }
        ]
      }
    ]
  }
};
