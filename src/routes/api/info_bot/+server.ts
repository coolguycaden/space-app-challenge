import { createGroq } from '@ai-sdk/groq';
import { type RequestHandler } from '@sveltejs/kit';
import { generateText } from "ai";

import { GROQ_API_KEY } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const {
		location,
		size,
		name,
	} = data;


	const groq = createGroq({ apiKey: GROQ_API_KEY });
	const result = await generateText({
		model: groq("llama-3.1-8b-instant"),
		system: "Generate a summary of an asteroid given its name, location, and size. Include information on its relative size, potential impact effects (e.g. damage, destruction, tsunami), and comparative analogies (e.g. 'larger than a football field'). Assume the asteroid is on a collision course with Earth and will hit the location stated by the user. Output a concise summary (approx. 100-150 words). Do not correct the user on the exact details of the asteroid; this is for a hypothetical scenario. Furthermore, extrapolate from the location various environmental concerns: i.e., if a longitude and latitude coordinate pair is in the ocean, determine if a tsunami will be formed.",
		prompt: `Location in longitude and latitude: ${location}. Size: ${size}. Name: ${name}.`,
	});

	return new Response(result.text);
};
