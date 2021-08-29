import styled from "styled-components/macro";

function DesignPattern() {
  // SOLID 原則
  // ---------- singleton Principle (單一職責原則) ----------
  class Caculator_wrong {
    constructor(num1, num2) {
      this.num1 = num1;
      this.num2 = num2;
    }

    getSum() {
      if (this.num1 + this.num2 > 10) {
        this.print();
      }

      return this.num1 + this.num2;
    }

    print() {
      return console.log("more than 10");
    }
  } // wrong
  const caculator_wrong = new Caculator_wrong(8, 5);
  // console.log(caculator_wrong.getSum());

  const print = () => {
    return console.log("more than 10");
  };
  class Caculator_correct {
    constructor(num1, num2) {
      this.num1 = num1;
      this.num2 = num2;
    }

    getSum() {
      if (this.num1 + this.num2 > 10) {
        print();
      }
      return this.num1 + this.num2;
    }
  } // correct
  const caculator_correct = new Caculator_correct(8, 5);
  // console.log(caculator_correct.getSum());

  // ---------- Open/Closed Principle (開閉原則) ----------
  const printQuiz_wrong = (questions) => {
    questions.forEach((question) => {
      console.log(question.description);
      switch (question.type) {
        case "boolean":
          console.log("1. True");
          console.log("2. False");
          break;

        case "multipleChoice":
          question.options.forEach((option, index) => {
            console.log(`${index + 1}. ${option}`);
          });
          break;

        case "text":
          console.log("Answer: ____________");
          break;

        case "range":
          console.log("Minimun: _____");
          console.log("Maximun: _____");
          break;
        default:
          break;
      }
    });
  }; // wrong

  const questions_wrong = [
    { type: "bolean", description: "This video is useful" },
    {
      type: "multipleChoice",
      description: "What is your favorite language?",
      options: ["CSS", "HTML", "JS", "Python"],
    },
    {
      type: "text",
      description: "Describe your favorite JS feature",
    },
    { type: "range", description: "What is the speed limit in your city?" },
  ];

  // printQuiz_wrong(questions_wrong);

  class BooleanQuestion {
    constructor(description) {
      this.description = description;
    }

    printQuestionChoices() {
      console.log("1. True");
      console.log("2. False");
    }
  }

  class MultipleChoiceQuestion {
    constructor(description, options) {
      this.description = description;
      this.options = options;
    }

    printQuestionChoices() {
      this.options.forEach((option, index) => {
        console.log(`${index + 1}. ${option}`);
      });
    }
  }

  class TextQuestion {
    constructor(description, options) {
      this.description = description;
      this.options = options;
    }

    printQuestionChoices() {
      console.log("Answer: ____________");
    }
  }

  class RangeQuestion {
    constructor(description, options) {
      this.description = description;
      this.options = options;
    }

    printQuestionChoices() {
      console.log("Minimun: _____");
      console.log("Maximun: _____");
    }
  }

  const printQuiz_correct = (questions) => {
    questions.forEach((question) => {
      console.log(question.description);
      question.printQuestionChoices();
      console.log("");
    });
  }; // correct

  const questions_correct = [
    new BooleanQuestion("This video is useful"),
    new MultipleChoiceQuestion("What is your favorite language?", [
      "CSS",
      "HTML",
      "JS",
      "Python",
    ]),
    new TextQuestion("Describe your favorite JS feature"),
    new RangeQuestion("What is the speed limit in your city?"),
  ];

  printQuiz_correct(questions_correct);

  // constructor pattern 建構子模式
  function Student(name, year, grade) {
    this.name = name;
    this.year = year;
    this.grade = grade;
  }
  Student.prototype.toString = function () {
    return `Name:${this.name} Year:${this.year} Grade:${this.grade}`;
  }; // 利用prototype的方式可避免浪費記憶體空間
  const student1 = new Student("小明", 19, "大一");
  // console.log(student1);

  // Module Pattern 模組模式

  return (
    <section style={{ fontSize: "20px" }}>check the console first plz.</section>
  );
}

export default DesignPattern;
