package com.project.chatbot.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.BodyInserters;
import org.json.JSONObject;
import org.json.JSONArray;

@Service
public class AIService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://generativelanguage.googleapis.com/v1beta")
            .build();


    public String generateResponse(String userMessage) {
        try {
            // Build request body according to Gemini generateContent format
            JSONObject body = new JSONObject();
            JSONArray contents = new JSONArray();
            JSONObject contentObj = new JSONObject();
            JSONArray parts = new JSONArray();

            // Put the user text in parts
            JSONObject partText = new JSONObject();
            partText.put("text", userMessage);
            parts.put(partText);

            contentObj.put("parts", parts);
            contents.put(contentObj);

            body.put("contents", contents);

            // Example model name — update per your plan
            String modelName = "gemini-2.5-flash";

            // Call the officially documented endpoint
            String response = webClient.post()
                    .uri("/models/" + modelName + ":generateContent")
                    // Use the required API key header
                    .header("x-goog-api-key", apiKey)
                    .header("Content-Type", "application/json")
                    .body(BodyInserters.fromValue(body.toString()))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            // Log raw response for debugging
            System.out.println("Gemini raw response: " + response);

            // Parse the response (take the first candidate)
            JSONObject json = new JSONObject(response);
            JSONArray candidates = json.getJSONArray("candidates");
            if (candidates.length() > 0) {
                JSONObject first = candidates.getJSONObject(0);
                JSONObject content = first.getJSONObject("content");
                JSONArray partsResp = content.getJSONArray("parts");
                if (partsResp.length() > 0) {
                    return partsResp.getJSONObject(0).getString("text");
                }
            }

            // Fallback if no text found
            return "I couldn't generate a response.";

        } catch (Exception e) {
            e.printStackTrace();
            return "Sorry, I could not respond.";
        }
    }
}
