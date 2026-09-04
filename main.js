// Replace this placeholder link with your actual Discord Webhook URL
const DISCORD_WEBHOOK_URL = "YOUR_DISCORD_WEBHOOK_URL_HERE";

document.getElementById('webhookForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    const icName = document.getElementById('icName').value;
    const discordTag = document.getElementById('discordTag').value;
    const oocAge = document.getElementById('oocAge').value;
    const serverLevel = document.getElementById('serverLevel').value;
    const reason = document.getElementById('reason').value;

    if (DISCORD_WEBHOOK_URL === "YOUR_DISCORD_WEBHOOK_URL_HERE") {
        formStatus.className = "mt-4 text-center text-sm font-semibold p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400";
        formStatus.textContent = "Error: Please configure your Discord Webhook URL inside main.js!";
        formStatus.classList.remove('hidden');
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner animate-spin mr-2"></i> Transmitting...';

    const payload = {
        embeds: [{
            title: "🚨 New SFPD Academy Application",
            color: 3447003, // Blue color accent
            fields: [
                { name: "👤 In-Game Name (IC)", value: icName, inline: true },
                { name: "💬 Discord Tag", value: discordTag, inline: true },
                { name: "📅 OOC Age", value: oocAge, inline: true },
                { name: "⭐ Server Level", value: serverLevel, inline: true },
                { name: "📝 Reason to Join", value: reason, inline: false }
            ],
            footer: {
                text: "SFPD Recruitment System • Owned by M.r Chafik & M.r Shiro",
            },
            timestamp: new Date().toISOString()
        }]
    };

    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            formStatus.className = "mt-4 text-center text-sm font-semibold p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400";
            formStatus.textContent = "Application successfully transmitted to the SFPD command logs!";
            document.getElementById('webhookForm').reset();
        } else {
            throw new Error('Failed to transmit data.');
        }
    } catch (error) {
        formStatus.className = "mt-4 text-center text-sm font-semibold p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400";
        formStatus.textContent = "Transmission failed. Check your webhook URL or CORS settings.";
    } finally {
        formStatus.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane mr-2"></i> Submit Application to Discord';
    }
});