"""
Simple Gemini service placeholder used for local testing.
Generates quiz questions by rephrasing sentences from the provided context.
"""

from __future__ import annotations

import itertools
import random
import re
from dataclasses import dataclass
from typing import Dict, List, Sequence


@dataclass
class QuizQuestion:
    question: str
    answer: str
    options: Sequence[str]
    context: str

    def as_dict(self) -> Dict[str, str]:
        """Return dict representation expected by callers."""
        return {
            "question": self.question,
            "answer": self.answer,
            "options": list(self.options),
            "context": self.context,
        }


class GeminiService:
    """
    Lightweight stand-in for the real Gemini API integration.

    The real implementation would call the Gemini API using the provided API key.
    For local tests we simply build deterministic cloze-style questions using the
    supplied context so that downstream code can run without network calls.
    """

    def __init__(self, api_key: str | None = None) -> None:
        self.api_key = api_key

    def generate_quiz(self, context: str, num_questions: int = 3) -> List[Dict[str, str]]:
        sentences = self._tokenize_sentences(context)
        if not sentences:
            sentences = [context.strip() or "No context provided."]

        rng = random.Random(42)
        questions: List[QuizQuestion] = []

        for sentence in itertools.islice(itertools.cycle(sentences), num_questions):
            answer = sentence
            question = f"What does the following statement describe? \"{sentence}\""
            distractors = self._sample_distractors(rng, sentences, exclude=sentence)
            options = [answer] + distractors
            rng.shuffle(options)

            questions.append(
                QuizQuestion(
                    question=question,
                    answer=answer,
                    options=options,
                    context=sentence,
                )
            )

        return [q.as_dict() for q in questions]

    @staticmethod
    def _tokenize_sentences(text: str) -> List[str]:
        sentences = [
            s.strip()
            for s in re.split(r"(?<=[.!?])\s+", text)
            if s.strip()
        ]
        return sentences

    @staticmethod
    def _sample_distractors(rng: random.Random, sentences: Sequence[str], exclude: str) -> List[str]:
        distractor_pool = [s for s in sentences if s != exclude]
        filler = "The statement is unrelated to the topic."

        if len(distractor_pool) >= 3:
            return rng.sample(distractor_pool, 3)
        else:
            sampled = distractor_pool.copy()
            while len(sampled) < 3:
                sampled.append(filler)
            return sampled


__all__ = ["GeminiService", "QuizQuestion"]
