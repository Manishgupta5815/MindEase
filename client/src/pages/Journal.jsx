import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Journal() {
  const userName = "Anand"; // your logged-in username

  const [formData, setFormData] = useState({
    mood: 5,
    energy: 5,
    stress: 5,
    sleep: "",
    emotions: [],
    coping: [],
    comments: "",
  });

  const [showReport, setShowReport] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const generateAnalysis = () => {
    let feedback = "";

    const mood = parseInt(formData.mood);
    const stress = parseInt(formData.stress);
    const sleepHours = parseInt(formData.sleep) || 0;

    if (mood <= 4 && stress >= 7) {
      feedback +=
        "You seem to be going through a rough patch emotionally. Consider taking breaks, journaling, and reaching out to someone you trust. ";
    } else if (mood >= 7 && stress <= 5) {
      feedback +=
        "Your emotional balance seems healthy. Keep nurturing this stability through gratitude, mindfulness, and self-care. ";
    } else {
      feedback +=
        "You appear to be in a moderate emotional state. Reflect on what’s been affecting your mood, and try grounding techniques or a relaxing activity. ";
    }

    if (sleepHours < 6) {
      feedback +=
        "Your sleep seems insufficient — try to maintain a regular sleep routine and limit screen time before bed. ";
    } else if (sleepHours >= 7 && sleepHours <= 9) {
      feedback +=
        "You’re getting a healthy amount of rest — continue prioritizing your sleep hygiene. ";
    } else if (sleepHours > 9) {
      feedback +=
        "Oversleeping might indicate fatigue or stress. Try engaging in light exercise or social activity to boost energy. ";
    }

    if (formData.coping.length === 0) {
      feedback +=
        "You haven’t used many coping strategies today — consider exploring mindfulness, music, or physical movement to ease your mind.";
    } else {
      feedback += `It’s great that you’re coping through ${formData.coping.join(
        ", "
      )}. Keep using these methods to stay emotionally balanced.`;
    }

    return feedback;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProgress(0);
    setShowReport(false);
    const feedbackText = generateAnalysis();

    const interval = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(interval);
          setShowReport(true);
          setAnalysis(feedbackText);
          return 100;
        }
        return old + 10;
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfdff] via-[#f9fbff] to-white py-16 px-6 font-['Inter'] text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-10 border border-gray-100"
      >
        <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          MindEase Journal
        </h1>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">{userName}</h2>
        </div>

        {!showReport ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["mood", "energy", "stress"].map((key) => (
                <div key={key}>
                  <label className="block font-semibold mb-2 capitalize">
                    {key}
                  </label>
                  <input
                    type="range"
                    name={key}
                    min="1"
                    max="10"
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full accent-blue-600"
                  />
                  <p className="text-sm text-gray-600">
                    Level: {formData[key]}
                  </p>
                </div>
              ))}
            </div>

            {/* Sleep */}
            <div>
              <label className="block font-semibold mb-2">Sleep Duration</label>
              <input
                type="text"
                name="sleep"
                placeholder="e.g. 7 hours"
                value={formData.sleep}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Emotions */}
            <div>
              <label className="block font-semibold mb-3">
                Emotions You Felt Today
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Happy", "Sad", "Anxious", "Excited", "Tired", "Calm"].map(
                  (emotion) => (
                    <label
                      key={emotion}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <input
                        type="checkbox"
                        name="emotions"
                        value={emotion}
                        checked={formData.emotions.includes(emotion)}
                        onChange={handleChange}
                        className="accent-purple-600"
                      />
                      {emotion}
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Coping */}
            <div>
              <label className="block font-semibold mb-3">
                What Helped You Cope?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Meditation",
                  "Talking to a friend",
                  "Music",
                  "Exercise",
                  "Sleep",
                  "Reading",
                ].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <input
                      type="checkbox"
                      name="coping"
                      value={item}
                      checked={formData.coping.includes(item)}
                      onChange={handleChange}
                      className="accent-blue-600"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block font-semibold mb-2">Additional Notes</label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows="3"
                placeholder="Write anything you’d like to express..."
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
              ></textarea>
            </div>

            {/* Submit */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="px-10 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-2xl transition-all"
              >
                Analyze My Report
              </motion.button>
            </div>
          </form>
        ) : (
          // Mental Health Report
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            {progress < 100 ? (
              <div className="mt-10">
                <p className="text-gray-600 mb-4">
                  Analyzing your emotional patterns... please wait 💭
                </p>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-3 bg-gradient-to-r from-blue-600 to-purple-600"
                  ></motion.div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 mt-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {userName}'s Personalized Wellness Report 🌿
                </h2>
                <p className="text-gray-700 mb-4">
                  Hey {userName}, here’s your mental health summary:
                </p>

                <p className="text-gray-600 mb-4 leading-relaxed">{analysis}</p>

                <p className="text-gray-700 italic mb-4">
                  "Remember — emotional ups and downs are part of being human.
                  Reflect, recharge, and be kind to yourself."
                </p>

                <button
                  onClick={() => setShowReport(false)}
                  className="px-8 py-3 mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-2xl transition-all"
                >
                  Back to Journal
                </button>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
