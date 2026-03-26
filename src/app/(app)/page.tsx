import { ProfileHeader } from "@/features/portfolio/components/profile-header";
import { Overview } from "@/features/portfolio/components/overview";
import { SocialLinks } from "@/features/portfolio/components/social-links";
import { About } from "@/features/portfolio/components/about";
import { QuickJump } from "@/features/portfolio/components/quick-jump";
import { TechStackGroup } from "@/features/portfolio/components/tech-stack-group";
import { BlogPreview } from "@/features/portfolio/components/blog-preview";
import { Experiences } from "@/features/portfolio/components/experiences";
import { EducationSection } from "@/features/portfolio/components/education-section";
import { ProjectsSection } from "@/features/portfolio/components/projects-section";
import { Research } from "@/features/portfolio/components/research";
import { CertificationsSection } from "@/features/portfolio/components/certifications-section";
import { BookmarksSection } from "@/features/portfolio/components/bookmarks-section";
import { TECH_STACK_GAMEDEV } from "@/features/portfolio/data/tech-stack-gamedev";
import { TECH_STACK_TECHART } from "@/features/portfolio/data/tech-stack-techart";
import { TECH_STACK_AI } from "@/features/portfolio/data/tech-stack-ai";
import { TECH_STACK_FULLSTACK } from "@/features/portfolio/data/tech-stack-fullstack";
import { ScreenLine } from "@/components/screen-line";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl py-4">
      <ProfileHeader />
      <ScreenLine />
      <Overview />
      <ScreenLine />
      <SocialLinks />
      <ScreenLine />
      <About />
      <ScreenLine />
      <QuickJump />
      <ScreenLine />
      <TechStackGroup
        stacks={[
          { title: "Stack: Game Development", items: TECH_STACK_GAMEDEV },
          { title: "Stack: Technical Art",    items: TECH_STACK_TECHART },
          { title: "Stack: AI / ML",          items: TECH_STACK_AI },
          { title: "Stack: Fullstack",        items: TECH_STACK_FULLSTACK },
        ]}
      />
      <ScreenLine />
      <BlogPreview />
      <ScreenLine />
      <Experiences />
      <ScreenLine />
      <EducationSection />
      <ScreenLine />
      <ProjectsSection />
      <ScreenLine />
      <Research />
      <ScreenLine />
      <CertificationsSection />
      <ScreenLine />
      <BookmarksSection />
    </div>
  );
}
