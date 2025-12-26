
export type DistributorMode = 'NEW' | 'EXISTING';

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
  };
  lbr: {
    points: number;
    percent: number;
    qualified: boolean;
  };
  ufi: {
    points: number;
    percent: number;
    qualified: boolean;
  };
}

export interface UserPerformance {
  mode: DistributorMode;
  isDoublePromotion: boolean; // 더블 점수 프로모션 여부
  ggd: GGDData;
  lbr: LBRData;
  ufi: UFIParams; // UFI 수기 입력 관리
}
