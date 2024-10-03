
import React from 'react';
import './ProfileMainSection.css';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function ProfileMainSection() {
  return (
    <div className="container">
      <div className="sidebar">
      <Avatar className="w-60 h-60">
                <AvatarImage src="./images/placeholder-avatar.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
        <h2>Name</h2>
        <div className="skills">
          <h3>Skills</h3>
          <ul>
            <li>Skill 1</li>
            <li>Skill 2</li>
            <li>Skill 3</li>
          </ul>
        </div>
      </div>

      <div className="main-section">
        <h2>Career</h2>
        <p>Key information goes here...</p>

        <br></br>

        <h2>Education</h2>
        <p>Key information goes here...</p>

        <br></br>

        <h2>Experience</h2>
        <p>Key information goes here...</p>

      </div>
    </div>
  );
}

export default ProfileMainSection;


