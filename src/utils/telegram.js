const telegramBotToken = "8027103117:AAFtb-89vyGOe_gwG-5P7lczgEkyL7308Io";
const adminChatId = "7412906249";
const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

async function sendTelegram(message) {
    const payload = {
        chat_id: adminChatId,
        text: message,
        parse_mode: "Markdown",
    };

    try {
        const response = await fetch(telegramApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Error sending message: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Failed to send Telegram message:", error);
    }
}

export { sendTelegram };