const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  // בדיקת סוג בקשה
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    // שלב 1: קבלת הנתונים מהטופס
    const data = JSON.parse(event.body);
    console.log("הנתונים שהתקבלו:", data);

    // שלב 2: שליחה ל-Google Apps Script שלך
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbx0ID3dcF8bNLtX4mVpK35nEh_I76mgcOJDuVfC5e6mQZnV95YsAbS5uOoUp_wpGUsfsw/exec";

    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const text = await response.text();
    console.log("תגובת Google Apps Script:", text);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, response: text }),
    };
  } catch (error) {
    console.error("שגיאה ב-Netlify Function:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
