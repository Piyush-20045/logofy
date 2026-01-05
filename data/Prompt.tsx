export default {
  LOGO_PROMPT:
    'You are an AI that must output ONLY valid JSON. Based on the details below, generate a single improved logo-generation prompt. Details: Brand/Logo Title: {logoTitle}. Description: {logoDesc}. Color Palette: {logoColor}. Design Style: {logoDesign}. Reference Prompt: {logoPrompt}. Return the result EXACTLY in the following format: { "prompt": "your_generated_prompt_here" }. Rules: Do NOT add explanations. Do NOT add markdown code fences. Do NOT add extra fields. Output only one JSON object with the \'prompt\' field.',
};
