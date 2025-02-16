import { CSSProperties } from "react";

export interface CustomCSSProperties extends CSSProperties {
  "--swiper-pagination-color"?: string;
  "--swiper-pagination-bullet-size"?: string;
  "--swiper-pagination-bullet-width"?: string;
  "--swiper-pagination-bullet-height"?: string;
  "--swiper-pagination-bullet-border-radius"?: string;
  "--swiper-pagination-bullet-inactive-color"?: string;
  "--swiper-pagination-top"?: string;
  "--swiper-pagination-bottom"?: string;
  "--swiper-navigation-size"?: string;
  "--swiper-navigation-color"?: string;
  "--swiper-navigation-sides-offset"?: string;
  "--swiper-pagination-bullet-inactive-opacity"?: string;
  "--swiper-pagination-bullet-horizontal-gap"?: string;
  "--swiper-navigation-top-offset"?: string;
}
