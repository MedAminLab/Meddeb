
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getDailyInsight = async (prayerTime?: string) => {
  try {
    const prompt = `Génère une courte réflexion spirituelle islamique basée sur le moment de la journée actuelle (${prayerTime || 'journée'}). Inclus un verset du Coran ou un Hadith pertinent. 
    Réponds obligatoirement en respectant ce format strictement:
    ARABE: [Le texte de la réflexion en arabe]
    FRANCAIS: [La traduction exacte du texte en français]
    
    Reste inspirant et concis (maximum 3 phrases par langue).`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "ARABE: الصلاة عماد الدين\nFRANCAIS: La prière est le pilier de la religion.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "ARABE: السلام عليكم ورحمة الله وبركاته\nFRANCAIS: Que la paix soit sur vous ainsi que la miséricorde d'Allah et Ses bénédictions.";
  }
};
