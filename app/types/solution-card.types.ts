export interface ISolution {
  icon: any;
  title: string;
  description: string;
  style: string;
}

export interface ISolutionCardProps {
  data: ISolution;
  isActive?: boolean;
}

export interface ISolutionIconProps {
  isActive?: boolean;
}
