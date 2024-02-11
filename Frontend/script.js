
API = "http://localhost:8000/";

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("myForm").addEventListener("submit", async function(event){
        event.preventDefault();

        var user_input = document.getElementById("fname").value;

        try {
            const data = await sentiment_analysis(user_input);
            console.log(data);
            document.getElementById("result").innerHTML = user_input;
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

async function sentiment_analysis(user_input) {
    try {
        const response = await fetch(API + 'sentiment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({text: user_input}),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

