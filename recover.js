$(function () {
    $("#recover").click(function () {
        // 取得輸入框文字
        var input = $("#input").val();
        // console.log(input)

        if (input == "") {
            alert("輸入不得為空白!")
        }
        else {
            var lines = input.split("\n")

            // 一行一行
            var output = ""
            lines.forEach(function (line, index) {
                // console.log(line, index);
                // console.log("before:", line)
                line = " " + line + " "
                if (line != "") {
                    // 復原前綴詞
                    prefixes.forEach(function (word, index) {
                        if (line.includes(word)) {
                            line = line.replace(word, "")
                        }
                    });
                    // 復原www，不小心寫太複雜了
                    const regex = /[^A-Za-z][wW]{1,}[^A-Za-z]/g
                    const result = [...line.matchAll(regex)];
                    if (result.length != 0) {
                        var move = 0
                        result.forEach(function (item) {
                            var index = item.index - move;
                            line = line.slice(0, index + 1) + line.slice(index + item[0].length - 1, line.length);
                            move += item[0].length - 2
                        });
                    }
                    // 復原後綴詞01
                    postfixes1.forEach(function (word, index) {
                        if (line.includes(word)) {
                            line = line.replace(word, "")
                        }
                    });
                    // 復原後綴詞02
                    var list = line.split("(")
                    var last_elem = list[list.length - 1]
                    if (!last_elem.includes(")")) {
                        line = line.slice(0, line.length - last_elem.length - 1)
                    }

                    // 刪除前後多餘的空格
                    line = line.trim();
                }
                // console.log("after:", line)

                output = output + line + "\n";
            });
        }

        // 顯示在輸出框
        // console.log(output);
        output = output.slice(0, output.length - 1)
        $("#output").val(output);
    })

    // 機率決定
    function prob_bool(prob) {
        return Math.random() < prob;
    }

    // 一鍵複製功能
    $("#copy").click(function () {
        $("#output").select();
        document.execCommand('copy');

        alert("已複製到剪貼簿!");
    })
})