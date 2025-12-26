
export interface GGDData {
  weeklyMaintenanceWeeks: number; // >= 150 CP 유지 주수
  growthCP: number;
  partnerDirectorPromoCount: number;
  newPaceSetters: number;
}

export interface LBRData {
  weeklyGrowthWeeks: number; // >= 1000 CP 유지 주수
  selfRankUpCount: number;
  executiveStatus: 'NONE' | 'NEW' | 'RENEW';
  partnerDirectorPromoCount: number;
  partnerGoldPromoCount: number;
}

export interface UFIParams {
  newPoints: number;
  accumulatedPoints: number;
  sponsoredBrandPartners: number; // 브랜드 파트너 후원 수 (필수 4명)
}

export interface PromotionStatus {
  ggd: {
    points: number;
    percent: number;
    qualified: boolean;
    missing: string[];
  };
  lbr: {
    points: number;
    percent: number;
    qualified: boolean;
    missing: string[];
  };
  ufi: {
    points: number;
    percent: number;
    qualified: boolean;
    missing: string[];
  };
}

export interface UserPerformance {
  isDoublePromotion: boolean; // 더블 점수 프로모션 여부 (UFI 한정)
  ggd: GGDData;
  lbr: LBRData;
  ufi: UFIParams;
}
