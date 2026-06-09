import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import jsPDF from "jspdf";

function StudyPlanner() {
  const [subject, setSubject] = useState("");
  const [examDate, setExamDate] = useState("");
  const [hours, setHours] = useState("");
  const [plan, setPlan] = useState([]);
  const [savedPlans, setSavedPlans] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const loadSavedPlans = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "users", user.uid, "studyPlans")
        );

        const plans = [];

        querySnapshot.forEach((doc) => {
          plans.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setSavedPlans(plans);
      } catch (error) {
        console.error(error);
      }
    };

    loadSavedPlans();
  }, [user]);

  const generatePlan = () => {
    if (!subject || !examDate || !hours) return;

    const today = new Date();
    const exam = new Date(examDate);

    const diffTime = exam - today;
    const daysLeft = Math.ceil(
      diffTime / (1000 * 60 * 60 * 24)
    );

    if (daysLeft <= 0) {
      alert("Please select a future exam date");
      return;
    }

    const topics = [
      "Basics",
      "Important Concepts",
      "Problem Solving",
      "Advanced Topics",
      "Practice Questions",
      "Revision",
      "Mock Test",
    ];

    const generatedPlan = [];

    for (let i = 0; i < daysLeft; i++) {
      generatedPlan.push({
        day: `Day ${i + 1}`,
        topic: `${subject} - ${topics[i % topics.length]}`,
      });
    }

    setPlan(generatedPlan);
  };

  const savePlan = async () => {
    if (plan.length === 0) return;

    try {
      const docRef = await addDoc(
        collection(db, "users", user.uid, "studyPlans"),
        {
          subject,
          examDate,
          hours,
          plan,
          createdAt: new Date(),
        }
      );

      setSavedPlans([
        ...savedPlans,
        {
          id: docRef.id,
          subject,
          examDate,
          hours,
          plan,
        },
      ]);

      alert("Study plan saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save study plan");
    }
  };

  const deletePlan = async (planId) => {
    try {
      await deleteDoc(
        doc(
          db,
          "users",
          user.uid,
          "studyPlans",
          planId
        )
      );

      setSavedPlans(
        savedPlans.filter(
          (plan) => plan.id !== planId
        )
      );

      alert("Plan deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete plan");
    }
  };
  const downloadPDF = (saved) => {
  const pdf = new jsPDF();

  pdf.setFontSize(18);
  pdf.text(`${saved.subject} Study Plan`, 20, 20);

  pdf.setFontSize(12);
  pdf.text(`Exam Date: ${saved.examDate}`, 20, 35);
  pdf.text(`Hours Per Day: ${saved.hours}`, 20, 45);

  let y = 60;

  saved.plan?.forEach((day) => {
    pdf.text(`${day.day}: ${day.topic}`, 20, y);
    y += 10;

    if (y > 270) {
      pdf.addPage();
      y = 20;
    }
  });

  pdf.save(`${saved.subject}_StudyPlan.pdf`);
};

  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-6">
        AI Study Planner 🤖
      </h1>

      <div className="bg-zinc-900 p-6 rounded-3xl">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 rounded-xl bg-black border border-zinc-700"
          />

          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="w-full p-3 rounded-xl bg-black border border-zinc-700"
          />

          <input
            type="number"
            placeholder="Hours per day"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full p-3 rounded-xl bg-black border border-zinc-700"
          />

          <button
            onClick={generatePlan}
            className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded-xl"
          >
            Generate Study Plan
          </button>
        </div>

        {plan.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              Generated Plan
            </h2>

            <button
              onClick={savePlan}
              className="mb-4 bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl font-semibold"
            >
              Save Plan
            </button>

            {plan.map((item, index) => (
              <div
                key={index}
                className="bg-black p-4 rounded-xl mb-3"
              >
                <p className="font-bold">{item.day}</p>
                <p>{item.topic}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">
            My Saved Study Plans
          </h2>

          {savedPlans.length === 0 ? (
            <p className="text-gray-400">
              No saved plans yet.
            </p>
          ) : (
            savedPlans.map((saved) => (
              <details
                key={saved.id}
                className="bg-black p-4 rounded-xl mb-4"
              >
              <summary className="cursor-pointer text-lg font-bold text-blue-400">
                {saved.subject}
              </summary>

            <div className="flex gap-2 justify-end mt-3">
              <button
                onClick={() => downloadPDF(saved)}
                className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-lg text-sm"
              >
              PDF
              </button>

              <button
                onClick={() => deletePlan(saved.id)}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-sm"
              >
               Delete
              </button>
            </div>

                <div className="mt-3">
                  <p>Exam Date: {saved.examDate}</p>

                  <p>
                    Hours Per Day: {saved.hours}
                  </p>

                  <p>
                    Total Days: {saved.plan?.length}
                  </p>

                  <div className="mt-4">
                    {saved.plan?.map((day, i) => (
                      <div
                        key={i}
                        className="bg-zinc-900 p-3 rounded-lg mb-2"
                      >
                        <strong>{day.day}</strong>
                        <p>{day.topic}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </details>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default StudyPlanner;