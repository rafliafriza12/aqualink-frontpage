export interface IBenefit {
  category: "USER" | "PDAM";
  benefits: string[];
  style: string;
}

export interface IBenefitCardProps {
  data: IBenefit;
}
