function CYK(props) {
  let { grammar, word } = props;
  const lines = grammar.split("\n");
  let tokens = lines.map((line) => {
    return line.split("->");
  });

  tokens = tokens.map((token) => {
    if (token.length > 1) {
      return [token[0], ...token[1].split("|")];
    }
    return [];
  });

  tokens = tokens.filter((token) => {
    return token.length !== 0;
  });

  tokens = tokens.map((line) => {
    let trimmedLine = line.map((token) => {
      return token.trim();
    });
    return trimmedLine;
  });

  let tokenMap = {};

  tokens.forEach((line) => {
    for (let i = 1; i < line.length; i++) {
      if (!(line[i] in tokenMap)) {
        tokenMap[line[i]] = [];
      }
      tokenMap[line[i]].push(line[0]);
    }
  });

  let n = word.length;
  let table = [];

  for (let i = n; i >= 1; i--) {
    table.push(new Array(i));
  }

  for (let i = 0; i < n; i++) {
    const letter = word[i];
    if (tokenMap[letter]) {
      table[0][i] = tokenMap[letter];
    } else {
      table[0][i] = ["Ø"];
    }
  }

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      const stateSet = new Set();

      for (let x = 0; x < i; x++) {
        for (const letter1 of table[x][j]) {
          for (const letter2 of table[i - x - 1][j + x + 1]) {
            const state = letter1 + letter2;

            if (tokenMap[state]) {
              tokenMap[state].forEach(stateSet.add, stateSet);
            }
          }
        }
      }
      table[i][j] = Array.from(stateSet);
      if (table[i][j].length === 0) table[i][j].push("Ø");
    }
  }

  table.reverse();

  let isInGrammar = false;
  if (table[0][0].includes("S")) {
    isInGrammar = true;
  }

  const brdr = "border px-8 py-4";
  return (
    <>
      <div className="mx-auto mb-3 mt-3">
        <div className="min-w-min max-w-lg flex p-6 shadow-md bg-gray-50 rounded-lg">
          <table className="table-fixed">
            <tbody>
              {table.map((t1, index) => {
                return (
                  <tr key={index}>
                    {t1.map((t2, index) => {
                      return (
                        <td key={index} className={brdr}>
                          {t2.join(", ")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              <tr>
                {Array.from(word).map((letter, index) => {
                  return (
                    <td key={index} className="px-6 py-2 font-bold">
                      {letter}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        className={
          isInGrammar
            ? "mx-auto mb-5 text-green-500"
            : "mx-auto mb-5 text-red-500"
        }
      >
        {isInGrammar
          ? "Word belongs to the grammar."
          : "Word does not belongs to the grammar."}
      </div>
    </>
  );
}

export default CYK;
