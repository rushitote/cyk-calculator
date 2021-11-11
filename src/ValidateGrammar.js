export default function ValidateGrammar(grammar) {
  const lines = grammar.split("\n");
  let tokens = lines.map((line) => {
    return line.split("->");
  });

  let val = true;
  tokens.forEach((token) => {
    console.log(token[0]);
    if (token.length > 1) {
      if (token[0].trim().length !== 1) {
        val = false;
      } else if (token[0].match(/[A-Z]/i).length !== 1) {
        val = false;
      }
    }
  });
  if (!val) return false;
  return true;
}
