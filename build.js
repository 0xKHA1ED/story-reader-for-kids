const fs = require('fs');

// Read the JSON data
const storyData = JSON.parse(fs.readFileSync('story.json', 'utf8'));

// Read the HTML template
let template = fs.readFileSync('template.html', 'utf8');

// Generate the story content HTML
const storyContent = storyData.content.map(item => {
    if (item.type === 'paragraph') {
        return `
            <div class="translatable-block">
                <p data-translation="${item.translation.replace(/"/g, '&quot;')}">${item.text}</p>
                <button class="translate-btn mt-2 px-3 py-1 bg-emerald-500 text-white text-sm rounded-md hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400">Traducir</button>
                <p class="translation-text hidden mt-2 text-sky-700 italic bg-sky-50 p-3 rounded-md"></p>
            </div>`;
    } else if (item.type === 'image') {
        return `<img src="${item.src}" alt="${item.alt}" class="w-full md:w-2/3 mx-auto aspect-video object-cover rounded-lg shadow-md my-6 md:my-8">`;
    }
    return '';
}).join('\n                    ');

// Generate the moral HTML
const moralContent = `
                    <div class="translatable-block">
                        <p class="story-title text-xl italic text-emerald-700 font-semibold" data-translation="${storyData.moral.translation}">${storyData.moral.text}</p>
                        <button class="translate-btn mt-2 px-3 py-1 bg-emerald-500 text-white text-sm rounded-md hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400">Traducir</button>
                        <p class="translation-text hidden mt-2 text-sky-700 italic bg-sky-50 p-3 rounded-md"></p>
                    </div>`;

// Replace placeholders in the template
template = template.replace(/{{TITLE}}/g, storyData.title);
template = template.replace(/{{AUDIO_SRC}}/g, storyData.audioSrc);
template = template.replace(/{{STORY_CONTENT}}/g, storyContent);
template = template.replace(/{{MORAL}}/g, moralContent);

// Write the new HTML file
fs.writeFileSync('new_index.html', template);

console.log('Successfully generated new_index.html');