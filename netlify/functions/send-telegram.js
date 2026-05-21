exports.handler = async (event) => {
  try {
    const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TOKEN) {
      throw new Error("TELEGRAM_BOT_TOKEN не найден в Netlify");
    }

    if (!CHAT_ID) {
      throw new Error("TELEGRAM_CHAT_ID не найден в Netlify");
    }

    let data = {};

    if (event.body) {
      data = JSON.parse(event.body);
    }

    const name = data.name || "Не указано";
    const attendance = data.attendance || "Не указано";
    const comment = data.comment || "—";

    const text =
`💍 Новое подтверждение

👤 ФИО: ${name}

✅ Ответ:
${attendance}

💬 Комментарий:
${comment}`;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text
        })
      }
    );

    const telegramResult = await telegramResponse.json();

    if (!telegramResponse.ok) {
      throw new Error(JSON.stringify(telegramResult));
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        message: "Отправлено в Telegram"
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        ok: false,
        error: error.message
      })
    };
  }
};
