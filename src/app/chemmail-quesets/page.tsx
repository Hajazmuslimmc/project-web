'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Play, Pause, RotateCcw, Trophy, Star, Zap } from 'lucide-react'
import Link from 'next/link'

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the chemical symbol for Gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correct: 2,
    explanation: "Gold's chemical symbol is Au, derived from the Latin word 'aurum'."
  },
  {
    id: 2,
    question: "Which element has the atomic number 1?",
    options: ["Helium", "Hydrogen", "Lithium", "Carbon"],
    correct: 1,
    explanation: "Hydrogen has atomic number 1, making it the first element in the periodic table."
  },
  {
    id: 3,
    question: "What is the chemical formula for water?",
    options: ["H2O", "CO2", "NaCl", "O2"],
    correct: 0,
    explanation: "Water's chemical formula is H2O, consisting of two hydrogen atoms and one oxygen atom."
  },
  {
    id: 4,
    question: "Which gas makes up about 78% of Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
    correct: 2,
    explanation: "Nitrogen makes up about 78% of Earth's atmosphere, while oxygen makes up about 21%."
  },
  {
    id: 5,
    question: "What is the pH of pure water at 25°C?",
    options: ["6", "7", "8", "9"],
    correct: 1,
    explanation: "Pure water has a pH of 7, which is considered neutral on the pH scale."
  }
]

export default function ChemmailQuesets() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameOver, setGameOver] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(questions.length).fill(false))

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameStarted && timeLeft > 0 && !gameOver) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0) {
      setGameOver(true)
    }
    return () => clearTimeout(timer)
  }, [timeLeft, gameStarted, gameOver])

  const startGame = () => {
    setGameStarted(true)
    setTimeLeft(30)
    setCurrentQuestion(0)
    setScore(0)
    setGameOver(false)
    setAnsweredQuestions(new Array(questions.length).fill(false))
  }

  const resetGame = () => {
    setGameStarted(false)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResult(false)
    setTimeLeft(30)
    setGameOver(false)
    setAnsweredQuestions(new Array(questions.length).fill(false))
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null || gameOver) return
    
    setSelectedAnswer(answerIndex)
    const isCorrect = answerIndex === questions[currentQuestion].correct
    
    if (isCorrect) {
      setScore(score + 1)
    }
    
    const newAnsweredQuestions = [...answeredQuestions]
    newAnsweredQuestions[currentQuestion] = true
    setAnsweredQuestions(newAnsweredQuestions)
    
    setShowResult(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setGameOver(true)
    }
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return "Excellent! You're a chemistry master!"
    if (percentage >= 60) return "Good job! You know your chemistry!"
    if (percentage >= 40) return "Not bad! Keep studying chemistry!"
    return "Keep practicing! Chemistry is fun to learn!"
  }

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return "text-green-400"
    if (percentage >= 60) return "text-yellow-400"
    if (percentage >= 40) return "text-orange-400"
    return "text-red-400"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-primary-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold gradient-text">chemmail Quesets</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {!gameStarted ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="card mb-8">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
                  chemmail Quesets
                </h1>
                <p className="text-xl text-gray-300 mb-6">
                  Test your chemistry knowledge with our interactive quiz game!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Trophy className="w-5 h-5" />
                    <span>{questions.length} Questions</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Zap className="w-5 h-5" />
                    <span>30 Seconds per Question</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Star className="w-5 h-5" />
                    <span>Chemistry Focus</span>
                  </div>
                </div>
                <button
                  onClick={startGame}
                  className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 mx-auto"
                >
                  <Play className="w-6 h-6" />
                  <span>Start Quiz</span>
                </button>
              </div>
            </motion.div>
          ) : gameOver ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="card">
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
                <div className={`text-4xl font-bold mb-4 ${getScoreColor()}`}>
                  {score}/{questions.length}
                </div>
                <p className="text-xl text-gray-300 mb-6">{getScoreMessage()}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={startGame}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>Play Again</span>
                  </button>
                  <Link href="/">
                    <button className="btn-secondary flex items-center space-x-2">
                      <ArrowLeft className="w-5 h-5" />
                      <span>Back to Home</span>
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="card"
            >
              {/* Timer */}
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-400">
                  Question {currentQuestion + 1} of {questions.length}
                </div>
                <div className={`text-lg font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-primary-400'}`}>
                  {timeLeft}s
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-dark-700 rounded-full h-2 mb-6">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>

              {/* Question */}
              <h2 className="text-2xl font-bold mb-8 text-center">
                {questions[currentQuestion].question}
              </h2>

              {/* Answer Options */}
              <div className="space-y-4 mb-8">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null || gameOver}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                      selectedAnswer === null
                        ? 'border-dark-600 hover:border-primary-500 hover:bg-primary-500/10'
                        : selectedAnswer === index
                        ? index === questions[currentQuestion].correct
                          ? 'border-green-500 bg-green-500/20 text-green-400'
                          : 'border-red-500 bg-red-500/20 text-red-400'
                        : index === questions[currentQuestion].correct
                        ? 'border-green-500 bg-green-500/20 text-green-400'
                        : 'border-dark-600 opacity-50'
                    }`}
                  >
                    <span className="font-semibold">{String.fromCharCode(65 + index)}. </span>
                    {option}
                  </button>
                ))}
              </div>

              {/* Result and Explanation */}
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6 p-4 rounded-lg bg-dark-700/50"
                >
                  <p className="text-gray-300 mb-4">
                    {questions[currentQuestion].explanation}
                  </p>
                  <button
                    onClick={nextQuestion}
                    className="btn-primary w-full"
                  >
                    {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </button>
                </motion.div>
              )}

              {/* Score Display */}
              <div className="text-center text-gray-400">
                Score: {score}/{currentQuestion + 1}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
