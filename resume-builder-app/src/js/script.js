document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form');
    const educationSection = document.getElementById('education-section');
    const experienceSection = document.getElementById('experience-section');

    // Add Education Entry
    document.getElementById('add-education').addEventListener('click', () => {
        const educationEntry = document.createElement('div');
        educationEntry.className = 'education-entry';
        educationEntry.innerHTML = `
            <input type="text" placeholder="Degree" required>
            <input type="text" placeholder="Institution" required>
            <input type="text" placeholder="Year" required>
        `;
        educationSection.appendChild(educationEntry);
    });

    // Add Experience Entry
    document.getElementById('add-experience').addEventListener('click', () => {
        const experienceEntry = document.createElement('div');
        experienceEntry.className = 'experience-entry';
        experienceEntry.innerHTML = `
            <input type="text" placeholder="Job Title" required>
            <input type="text" placeholder="Company" required>
            <input type="text" placeholder="Duration" required>
            <textarea placeholder="Job Description" rows="3"></textarea>
        `;
        experienceSection.appendChild(experienceEntry);
    });

    // Handle skills input
    document.getElementById('skills').addEventListener('input', function() {
        const skillsContainer = document.getElementById('skills-container');
        const skills = this.value.split(',');
        skillsContainer.innerHTML = '';
        
        skills.forEach(skill => {
            if (skill.trim()) {
                const skillButton = document.createElement('span');
                skillButton.className = 'skill-button';
                skillButton.textContent = skill.trim();
                skillsContainer.appendChild(skillButton);
            }
        });
    });

    // Form Submit Handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();  // Prevent form submission
        
        // Store form data
        const formData = new FormData(form);
        
        // Show preview section
        document.getElementById('preview-section').style.display = 'block';

        // Update personal information
        document.getElementById('preview-name').textContent = formData.get('full-name');
        document.getElementById('preview-job-title').textContent = formData.get('job-title');

        // Update contact information
        document.getElementById('preview-email').textContent = formData.get('email');
        document.getElementById('preview-phone').textContent = formData.get('phone');
        document.getElementById('preview-location').textContent = formData.get('location');

        // Update photo
        const photoInput = document.getElementById('photo');
        if (photoInput.files && photoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const previewPhoto = document.getElementById('preview-photo');
                previewPhoto.src = e.target.result;
                previewPhoto.style.display = 'block';
            };
            reader.readAsDataURL(photoInput.files[0]);
        }

        // Update education
        const previewEducation = document.getElementById('preview-education');
        previewEducation.innerHTML = '';
        document.querySelectorAll('.education-entry').forEach(entry => {
            const degree = entry.querySelector('input[placeholder="Degree"]').value;
            const institution = entry.querySelector('input[placeholder="Institution"]').value;
            const year = entry.querySelector('input[placeholder="Year"]').value;
            
            if (degree && institution && year) {
                const educationItem = document.createElement('div');
                educationItem.className = 'education-item';
                educationItem.innerHTML = `
                    <h4>${degree}</h4>
                    <p>${institution} - ${year}</p>
                `;
                previewEducation.appendChild(educationItem);
            }
        });

        // Update experience
        const previewExperience = document.getElementById('preview-experience');
        previewExperience.innerHTML = '';
        document.querySelectorAll('.experience-entry').forEach(entry => {
            const jobTitle = entry.querySelector('input[placeholder="Job Title"]').value;
            const company = entry.querySelector('input[placeholder="Company"]').value;
            const duration = entry.querySelector('input[placeholder="Duration"]').value;
            const description = entry.querySelector('textarea').value;
            
            if (jobTitle && company) {
                const experienceItem = document.createElement('div');
                experienceItem.className = 'experience-item';
                experienceItem.innerHTML = `
                    <h4>${jobTitle}</h4>
                    <p class="company">${company} - ${duration}</p>
                    <p class="description">${description}</p>
                `;
                previewExperience.appendChild(experienceItem);
            }
        });

        // Update skills
        const previewSkills = document.getElementById('preview-skills');
        previewSkills.innerHTML = '';
        const skills = document.getElementById('skills').value.split(',');
        skills.forEach(skill => {
            if (skill.trim()) {
                const skillItem = document.createElement('li');
                skillItem.className = 'skill-item';
                skillItem.textContent = skill.trim();
                previewSkills.appendChild(skillItem);
            }
        });

        // Update languages
        const languagesContainer = document.getElementById('preview-languages');
        languagesContainer.innerHTML = '';
        const languages = document.getElementById('languages').value.split(',');
        languages.forEach(language => {
            if (language.trim()) {
                const langSpan = document.createElement('span');
                langSpan.className = 'language-item';
                langSpan.textContent = language.trim();
                languagesContainer.appendChild(langSpan);
            }
        });

        // Update interests
        document.getElementById('preview-interests').textContent = 
            document.getElementById('interests').value;
            
        // Keep the form visible
        document.querySelector('.form-section').style.display = 'block';
    });

    // Enhanced PDF download handler
    document.getElementById('download-pdf').addEventListener('click', async () => {
        // Get the preview element
        const preview = document.getElementById('resume-preview');
        if (!preview) return;

        // Create staging area
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '0';
        document.body.appendChild(container);

        // Generate clean HTML structure with inline styles
        const content = `
            <div style="width:210mm; min-height:297mm; margin:0; padding:0; background:white; display:flex;">
                <div style="width:35%; background-color:#2c3e50; padding:20mm; box-sizing:border-box; color:white;">
                    <div style="margin-bottom:20mm;">
                        ${document.querySelector('#preview-photo') ? 
                            `<img src="${document.querySelector('#preview-photo').src}" 
                             style="width:100px; height:100px; border-radius:50%; border:3px solid white; 
                             display:block; margin:0 auto 20mm auto;">` : ''}
                        
                        <h3 style="color:white; border-bottom:1px solid rgba(255,255,255,0.2); 
                                 padding-bottom:5mm; margin-bottom:10mm;">Contact</h3>
                        <p style="color:white; margin-bottom:5mm;">${document.getElementById('preview-email').textContent}</p>
                        <p style="color:white; margin-bottom:5mm;">${document.getElementById('preview-phone').textContent}</p>
                        <p style="color:white; margin-bottom:5mm;">${document.getElementById('preview-location').textContent}</p>
                    </div>

                    <div style="margin-bottom:20mm;">
                        <h3 style="color:white; border-bottom:1px solid rgba(255,255,255,0.2); 
                                 padding-bottom:5mm; margin-bottom:10mm;">Education</h3>
                        ${document.getElementById('preview-education').innerHTML}
                    </div>

                    <div style="margin-bottom:20mm;">
                        <h3 style="color:white; border-bottom:1px solid rgba(255,255,255,0.2); 
                                 padding-bottom:5mm; margin-bottom:10mm;">Skills</h3>
                        <div style="display:flex; flex-wrap:wrap; gap:5px;">
                            ${Array.from(document.querySelectorAll('#preview-skills li'))
                                .map(skill => `<span style="background:rgba(255,255,255,0.2); color:white; 
                                             padding:5px 15px; border-radius:15px; margin:2px; 
                                             display:inline-block;">${skill.textContent}</span>`).join('')}
                        </div>
                    </div>

                    <div style="margin-bottom:20mm;">
                        <h3 style="color:white; border-bottom:1px solid rgba(255,255,255,0.2); 
                                 padding-bottom:5mm; margin-bottom:10mm;">Languages</h3>
                        <div style="display:flex; flex-wrap:wrap; gap:5px;">
                            ${Array.from(document.querySelectorAll('.language-item'))
                                .map(lang => `<span style="background:rgba(255,255,255,0.2); color:white; 
                                            padding:5px 15px; border-radius:15px; margin:2px; 
                                            display:inline-block;">${lang.textContent}</span>`).join('')}
                        </div>
                    </div>
                </div>

                <div style="width:65%; padding:20mm; box-sizing:border-box; background:white;">
                    <h1 style="color:#2c3e50; font-size:24px; margin-bottom:5mm;">
                        ${document.getElementById('preview-name').textContent}
                    </h1>
                    <p style="color:#666; font-size:18px; margin-bottom:15mm;">
                        ${document.getElementById('preview-job-title').textContent}
                    </p>

                    <h2 style="color:#2c3e50; font-size:20px; border-bottom:1px solid #3498db; 
                              padding-bottom:5px; margin:15px 0;">Work Experience</h2>
                    ${document.getElementById('preview-experience').innerHTML}

                    <h2 style="color:#2c3e50; font-size:20px; border-bottom:1px solid #3498db; 
                              padding-bottom:5px; margin:15px 0;">Interests</h2>
                    <p style="color:#666;">${document.getElementById('preview-interests').textContent}</p>
                </div>
            </div>
        `;

        container.innerHTML = content;

        // Configure PDF options
        const opt = {
            margin: 0,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                letterRendering: true,
                backgroundColor: '#FFFFFF',
                windowWidth: 794, // A4 width in pixels
                windowHeight: 1123 // A4 height in pixels
            },
            jsPDF: { 
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            }
        };

        try {
            // Generate PDF
            await html2pdf().set(opt).from(container).save();
        } catch (error) {
            console.error('PDF generation failed:', error);
        } finally {
            document.body.removeChild(container);
        }
    });
});



