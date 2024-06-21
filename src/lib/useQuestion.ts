import { Ahgohebhbilyngcklepl as Question } from "../../public/data/question/ahgohebhbilyngcklepl"
import { useTypedFetch } from "./genericHooks/useTypedFetch"

/** Use a specific question. Use useQuestions to get a list of all questions */
export const useQuestions = (question: string) => {
  const questions = useTypedFetch<Question>(
    question && `/data/question/${question}.json`,
  )
  return questions
}
