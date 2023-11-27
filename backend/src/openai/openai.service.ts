import { ForbiddenException, Injectable } from '@nestjs/common';
import OpenAI from "openai";
import { OpenAISummary } from './dto/openai.dto';

@Injectable()
export class OpenaiService {
  private openAi;

  constructor() {
    this.openAi = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async getSummary(openAISummaryDto: OpenAISummary) {
    try {
      const content = `${openAISummaryDto.description}. Summarize this news for me`;
      const chatCompletion = await this.openAi.chat.completions.create({
        messages: [{ role: "assistant", content: content }],
        model: "gpt-3.5-turbo",
      });

      return chatCompletion.choices[0].message;
    }
    catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
