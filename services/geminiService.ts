
import { GoogleGenAI } from "@google/genai";
import { UserPerformance } from "../types";

// Always use process.env.API_KEY directly and ensure proper initialization as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMentorAdvice = async (performance: UserPerformance): Promise<string> => {
  const model = 'gemini-3-flash-preview';
  
  // 더블 점수는 UFI에만 한정 적용
  const ufiMultiplier = performance.isDoublePromotion ? 2 : 1;
  const ufiTotalPoints = performance.ufi.accumulatedPoints + (performance.ufi.newPoints * ufiMultiplier);
  const ufiPercent = Math.min(100, (ufiTotalPoints / 8000) * 100);
  const brandPartners = performance.ufi.sponsoredBrandPartners;

  const prompt = `
    당신은 유사나(Usana) 비즈니스 성공을 돕는 30년 경력의 전략가이자 따뜻한 멘토입니다. 
    사용자의 현재 실적 데이터를 분석하고, 2026년 인센티브 달성을 위한 구체적인 로드맵을 제시해주세요.
    
    [사용자 데이터]
    - 고게터 디스커버리: 150 CP 유지 ${performance.ggd.weeklyMaintenanceWeeks}주, 성장 CP ${performance.ggd.growthCP}, 파트너 디렉터 승급 ${performance.ggd.partnerDirectorPromoCount}명, 신규 페이스세터 ${performance.ggd.newPaceSetters}명
    - 리더십 비즈니스 리트릿: 1000 CP 유지 ${performance.lbr.weeklyGrowthWeeks}주, 본인 승급 ${performance.lbr.selfRankUpCount}회, 이그제큐티브 상태 ${performance.lbr.executiveStatus}, 파트너 디렉터 승급 ${performance.lbr.partnerDirectorPromoCount}명, 파트너 골드 승급 ${performance.lbr.partnerGoldPromoCount}명
    - 유사나 패밀리 인센티브(UFI): 현재 ${ufiTotalPoints}점 (최소 8,000점 필수), 브랜드 파트너 후원 ${brandPartners}/4명 (최소 4명 필수)
    
    [답변 가이드라인]
    1. 지혜롭고 따뜻한 멘토의 말투를 사용하세요.
    2. 전문 용어 대신 '고게터 디스커버리', '리더십 리트릿', '유사나 패밀리 인센티브(UFI)' 명칭을 사용하세요.
    3. 점수 단위는 반드시 'CP'를 사용하세요.
    4. UFI의 경우 8,000점 이상 및 브랜드 파트너 4인 후원 필수 조건을 정확히 인지하여 부족한 부분을 날카롭게 분석해주세요.
    5. 다음 분기 레커니션 행사(4월, 7월, 10월)에 맞춘 단기 액션 플랜을 제시하세요.
    6. 답변은 가독성 좋은 마크다운 형식으로 작성해주세요.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });
    return response.text || "멘토의 조언을 구성하는 중 오류가 발생했습니다. 다시 시도해 주세요.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "멘토의 조언을 가져오는 중에 문제가 발생했습니다. 당신의 비즈니스 열정을 응원합니다!";
  }
};
