exports.handler = async (event) => {
  try {
    const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    const params = new URLSearchParams(event.body);

    const name = params.get("name");
    const attendance = params.get("attendance");
    const comment = params.get("comment");

    const text =
`💍 Новое подтверждение

👤 ФИО: ${name}

✅ Ответ:
${attendance}

💬 Комментарий:
${comment || "—"}`;

    await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
        }),
      }
    );

    return {
      statusCode: 200,
      body: "OK",
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    };
  }
};