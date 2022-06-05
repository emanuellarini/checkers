export type StepProps = {
  handleNext: () => void;
  handleBack?: () => void;
  handleSkip?: () => void;
  isLastStep?: boolean;
};
