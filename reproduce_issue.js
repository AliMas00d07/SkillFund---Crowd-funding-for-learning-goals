
// using built-in fetch

async function testCreateCampaign() {
    const payload = {
        title: "Test Campaign",
        description: "This is a test description.",
        goal: 5000,
        category: "Technology",
        deadline: "2025-12-31"
    };

    try {
        const res = await fetch('http://127.0.0.1:5000/api/campaigns', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const contentType = res.headers.get("content-type");
        let data;
        if (contentType && contentType.indexOf("application/json") !== -1) {
            data = await res.json();
        } else {
            data = await res.text();
        }

        console.log(`Status: ${res.status}`);
        console.log('Response:', data);
    } catch (err) {
        console.error('Network Error:', err);
    }
}

testCreateCampaign();
