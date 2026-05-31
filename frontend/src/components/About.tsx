import { AboutSection, AboutContent, AboutValues } from "@/components/index";

type AboutProps = {
  /** When false, shows the label on the About page without linking to /about again. */
  linkStoryButton?: boolean;
};

const About = ({ linkStoryButton = true }: AboutProps) => {
  return (
    <div>
      <AboutSection linkStoryButton={linkStoryButton} />
      <AboutContent />
      <AboutValues />
    </div>
  );
};

export default About;