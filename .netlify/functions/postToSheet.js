const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const body = JSON.parse(event.body);
  const sheetUrl = 'https://script.google.com/macros/s/AKfycbx0ID3dcF8bNLtX4mVpK35nEh_I76mgcOJDuVfC5e6mQZnV95YsAbS5uOoUp_wpGUsfsw/exec';

  try {
    const res = await fetch(sheetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const result = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send to Google Apps Script', details: err.message })
    };
  }
};
