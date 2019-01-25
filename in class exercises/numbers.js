
            var myNumber = 42;
            myNumber = myNumber + 10;

            console.log(myNumber + 100);
            console.log(myNumber);

            var big = myNumber > 100;

            console.log(big);

            var users = ["pink", "purple", "blue"];
            console.log(users[2]);

            var complexuser = {
                name: "Lisa",
                zip: 02132,
            }

            var sayHello = function(name) {
                console.log("Hello " + name);
            }

            sayHello("Lisa");

            var plusTen = function(num) {
                return num + 10;
            }

            var newNum = plusTen(20);
            console.log (newNum);

            if (newNum > 100) {
                console.log ("damn");
            } else if (newNum > 20) {
                console.log ("oki");
            } else {
                console.log ("weak");
            }
