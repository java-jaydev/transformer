const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const HANGEUL1 = [
  "가",
  "나",
  "다",
  "라",
  "마",
  "바",
  "사",
  "아",
  "자",
  "차",
  "카",
  "타",
  "파",
  "하",
];
const HANGEUL2 = [
  "기",
  "니",
  "디",
  "리",
  "미",
  "비",
  "시",
  "이",
  "지",
  "치",
  "키",
  "티",
  "피",
  "히",
];

rl.question("규칙 선택(1~5): ", (rule) => {
  console.log("드래그 앤 드롭 텍스트를 입력하세요: ");
  let text = "";
  let emptyLineCount = 0;

  rl.on("line", (line) => {
    if (line === "") {
      emptyLineCount++;
    } else {
      emptyLineCount = 0;
    }
    text += line + "\n";

    if (emptyLineCount === 2) {
      rl.close();
      processInput(text, rule);
    }
  });
});

function processInput(text, rule) {
  const paragraphs = splitParagraphs(text);
  const transformedParagraphs = [];

  for (const paragraph of paragraphs) {
    transformedParagraphs.push(transformParagraph(paragraph, rule));
  }

  console.log("변환된 텍스트:");
  for (const transformedParagraph of transformedParagraphs) {
    console.log(transformedParagraph);
  }
}

function splitParagraphs(text) {
  return text.split("\n").filter((line) => line.trim() !== "");
}

function transformParagraph(paragraph, rule) {
  const sentences = paragraph.split(/[.?!]/);
  let transformedParagraph = "";

  switch (rule) {
    case "1":
      transformedParagraph = sentences
        .map((sentence, index) => transformSentence1(sentence, index))
        .join(". ");
      break;
    case "2":
      transformedParagraph = sentences
        .map((sentence, index) => transformSentence2(sentence, index))
        .join(". ");
      break;
    case "3":
      transformedParagraph = sentences
        .map((sentence, index) => transformSentence3(sentence, index))
        .join(". ");
      break;
    case "4":
      transformedParagraph = sentences
        .map((sentence, index) => transformSentence4(sentence, index))
        .join(". ");
      break;
    case "5":
      transformedParagraph = sentences
        .map((sentence, index) => transformSentence5(sentence, index))
        .join(". ");
      break;
    default:
      transformedParagraph = "규칙 없음";
  }

  return transformedParagraph;
}

function transformSentence1(sentence, sentenceIndex) {
  const words = sentence.split(" ");
  if (words.length >= 6) {
    [words[0], words[1]] = [words[1], words[0]]; // swap words at index 0 and 1
    [words[4], words[5]] = [words[5], words[4]]; // swap words at index 4 and 5
  }
  return words.join(" ");
}

function transformSentence2(sentence, sentenceIndex) {
  const words = sentence.split(" ");
  if (words.length >= 7) {
    [words[1], words[2]] = [words[2], words[1]]; // swap words at index 1 and 2
    [words[5], words[6]] = [words[6], words[5]]; // swap words at index 5 and 6
  }
  return words.join(" ");
}

function transformSentence3(sentence, sentenceIndex) {
  const words = sentence.split(" ");
  for (let i = 0; i < words.length; i++) {
    const chars = words[i].split("");
    let temp = "";
    chars.forEach((c) => {
      const k = HANGEUL1.includes(c) || HANGEUL2.includes(c) ? 2 : 1;
      temp += c.repeat(k);
    });
    words[i] = temp;
  }
  return words.join(" ");
}

function transformSentence4(sentence, sentenceIndex) {
  const words = sentence.split(" ");
  if (words.length >= 3) {
    [words[0], words[2]] = [words[2], words[0]]; // swap words at index 0 and 2
  }
  return words.join(" ");
}

function transformSentence5(sentence, sentenceIndex) {
  const words = sentence.split(" ");
  if (words.length >= 4) {
    [words[1], words[3]] = [words[3], words[1]]; // swap words at index 1 and 3
  }
  return words.join(" ");
}
