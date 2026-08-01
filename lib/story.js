// Story generation via OpenAI Chat Completions API
// Required env: OPENAI_API_KEY

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export function isOpenAIConfigured() {
  return !!process.env.OPENAI_API_KEY;
}

/**
 * Generate a personalized children's storybook using OpenAI.
 *
 * @param {object} params
 * @param {string} params.childName
 * @param {string} params.age
 * @param {string} params.gender
 * @param {string} params.theme
 * @param {string} params.dedication
 * @returns {Promise<{ title: string, dedication: string, chapters: Array<{ heading: string, text: string }> }>}
 */
export async function generateStory({ childName, age, gender, theme, dedication }) {
  if (!isOpenAIConfigured()) {
    console.warn('OPENAI_API_KEY not set — returning placeholder story');
    return buildPlaceholderStory({ childName, theme, dedication });
  }

  const themeLabel = (theme || 'adventure').replace(/-/g, ' ');
  // Gender is no longer collected from customers, so default to neutral
  // pronouns unless a value is explicitly provided (e.g. a future admin override).
  const pronouns =
    gender === 'female'
      ? { subject: 'she', object: 'her', possessive: 'her', reflexive: 'herself' }
      : gender === 'male'
      ? { subject: 'he', object: 'him', possessive: 'his', reflexive: 'himself' }
      : { subject: 'they', object: 'them', possessive: 'their', reflexive: 'themselves' };

  const systemPrompt = `You are a children's book author creating warm, imaginative, age-appropriate personalized storybooks.
Write stories that are joyful, adventurous, and celebrate the child as the hero.
Return ONLY valid JSON matching this exact structure:
{
  "title": "Story title",
  "chapters": [
    { "heading": "Chapter heading", "text": "Chapter body text (3–5 paragraphs)" },
    ...
  ]
}
Use ${childName} as the protagonist. Use pronouns: ${pronouns.subject}/${pronouns.object}/${pronouns.possessive}.`;

  const userPrompt = `Create a personalized children's storybook with these details:
- Child's name: ${childName}
- Age: ${age || 'unknown'}
- Theme: ${themeLabel}
${dedication ? `- Dedication message from the gift-giver: "${dedication}"` : ''}

Write 4 chapters. Each chapter should be engaging, use simple language suitable for age ${age || '5-8'}, and advance an exciting ${themeLabel} adventure with ${childName} as the star.`;

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + process.env.OPENAI_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
      max_tokens: 3000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${error}`);
  }

  const data = await response.json();
  const raw = data.choices?.[0]?.message?.content;

  if (!raw) throw new Error('OpenAI returned an empty response');

  const story = JSON.parse(raw);

  // Validate structure
  if (!story.title || !Array.isArray(story.chapters) || story.chapters.length === 0) {
    throw new Error('OpenAI response missing required story fields');
  }

  return {
    title: story.title,
    dedication: dedication || '',
    chapters: story.chapters,
  };
}

function buildPlaceholderStory({ childName, theme, dedication }) {
  const themeLabel = (theme || 'adventure').replace(/-/g, ' ');
  return {
    title: `${childName || 'The Star'} and the Great ${themeLabel.replace(/\b\w/g, l => l.toUpperCase())} Adventure`,
    dedication: dedication || '',
    chapters: [
      {
        heading: 'The Beginning',
        text: `Once upon a time, in a land full of wonder and magic, there lived a remarkable child named ${childName}. ${childName} had the biggest heart and the brightest smile in the whole kingdom. Every morning, ${childName} would wake up ready for whatever adventure the day might bring.`,
      },
      {
        heading: 'The Challenge',
        text: `One sunny day, ${childName} discovered something extraordinary at the edge of the forest. The kingdom needed a hero — and ${childName} was just the right person for the job. With courage in hand and a song in heart, ${childName} set off on the greatest ${themeLabel} adventure ever told.`,
      },
      {
        heading: 'The Journey',
        text: `Along the way, ${childName} made wonderful new friends, solved tricky puzzles, and showed everyone that kindness and bravery are the most powerful magic of all. Every challenge made ${childName} stronger and every friend made the journey brighter.`,
      },
      {
        heading: 'The Triumph',
        text: `At last, ${childName} returned home a true hero, cheered by all. And every night before sleep, ${childName} would look up at the stars and remember: the greatest adventure is the one you live with love. The End.`,
      },
    ],
  };
}
