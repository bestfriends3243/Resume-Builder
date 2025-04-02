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

        // Create staging area for PDF generation
        const container = document.createElement('div');
        container.innerHTML = `
            <div style="width:210mm; min-height:297mm; padding:20mm; box-sizing:border-box;">
                <div style="display:flex;">
                    <div style="width:35%; background-color:#2c3e50; padding:20px; color:white;">
                        <!-- Photo Section -->
                        ${document.querySelector('#preview-photo') ? 
                            `<div style="text-align:center; margin-bottom:20px;">
                                <img src="${document.querySelector('#preview-photo').src}" 
                                     style="width:150px; height:150px; border-radius:50%; border:3px solid white;">
                             </div>` : ''}
                        
                        <!-- Contact Section -->
                        <div style="margin-bottom:30px;">
                            <h3 style="color:white; border-bottom:2px solid rgba(255,255,255,0.2); padding-bottom:10px;">Contact</h3>
                            <p style="margin:5px 0;">${document.getElementById('preview-email').textContent}</p>
                            <p style="margin:5px 0;">${document.getElementById('preview-phone').textContent}</p>
                            <p style="margin:5px 0;">${document.getElementById('preview-location').textContent}</p>
                        </div>

                        <!-- Education Section -->
                        <div style="margin-bottom:30px;">
                            <h3 style="color:white; border-bottom:2px solid rgba(255,255,255,0.2); padding-bottom:10px;">Education</h3>
                            ${document.getElementById('preview-education').innerHTML}
                        </div>

                        <!-- Skills Section -->
                        <div style="margin-bottom:30px;">
                            <h3 style="color:white; border-bottom:2px solid rgba(255,255,255,0.2); padding-bottom:10px;">Skills</h3>
                            <div style="display:flex; flex-wrap:wrap; gap:5px;">
                                ${Array.from(document.querySelectorAll('#preview-skills li'))
                                    .map(skill => `<span style="background:rgba(255,255,255,0.2); color:white; 
                                                 padding:5px 10px; border-radius:15px; margin:2px; 
                                                 display:inline-block;">${skill.textContent}</span>`).join('')}
                            </div>
                        </div>

                        <!-- Languages Section -->
                        <div style="margin-bottom:30px;">
                            <h3 style="color:white; border-bottom:2px solid rgba(255,255,255,0.2); padding-bottom:10px;">Languages</h3>
                            <div style="display:flex; flex-wrap:wrap; gap:5px;">
                                ${Array.from(document.querySelectorAll('#preview-languages span'))
                                    .map(lang => `<span style="background:rgba(255,255,255,0.2); color:white; 
                                                padding:5px 10px; border-radius:15px; margin:2px; 
                                                display:inline-block;">${lang.textContent}</span>`).join('')}
                            </div>
                        </div>
                    </div>

                    <div style="width:65%; padding:20px;">
                        <!-- Header Section -->
                        <h1 style="color:#2c3e50; font-size:28px; margin:0 0 5px 0;">
                            ${document.getElementById('preview-name').textContent}
                        </h1>
                        <p style="color:#666; font-size:18px; margin:0 0 20px 0;">
                            ${document.getElementById('preview-job-title').textContent}
                        </p>

                        <!-- Experience Section -->
                        <div style="margin-bottom:30px;">
                            <h2 style="color:#2c3e50; font-size:20px; border-bottom:2px solid #3498db; 
                                      padding-bottom:10px; margin:0 0 15px 0;">Work Experience</h2>
                            ${document.getElementById('preview-experience').innerHTML}
                        </div>

                        <!-- Interests Section -->
                        <div style="margin-bottom:30px;">
                            <h2 style="color:#2c3e50; font-size:20px; border-bottom:2px solid #3498db; 
                                      padding-bottom:10px; margin:0 0 15px 0;">Interests</h2>
                            <p style="color:#666;">${document.getElementById('preview-interests').textContent}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Configure PDF options
        const opt = {
            margin: 0,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                letterRendering: true,
                backgroundColor: '#FFFFFF'
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
            alert('Failed to generate PDF. Please try again.');
        }
    });
});



