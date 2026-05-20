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

    let body = event.body || "";

if (event.isBase64Encoded) {
  body = Buffer.from(body, "base64").toString("utf8");
}

const params = new URLSearchParams(body);

    const name = params.get("name") || "Не указано";
    const attendance = params.get("attendance") || "Не указано";
    const comment = params.get("comment") || "—";

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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
        }),
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
      }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        ok: false,
        error: error.message
      }),
    };
  }
};
