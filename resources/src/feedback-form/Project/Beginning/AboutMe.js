import React from 'react';
import {useHistory} from 'react-router-dom';

import Progress from '../Progress';
import {useProject} from '../ProjectProvider';
import {useDropzone} from 'react-dropzone';
import addPicture from '../../../img/add-picture.svg';

const AboutMe = () => {
  const history = useHistory();
  const {
    name,
    setName,
    whoAmI,
    setWhoAmI,
    whyAmIHere,
    setWhyAmIHere,
    questionThemes,
    image,
    setImage,
    setFile,
  } = useProject();

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    const reader = new FileReader();
    reader.onabort = () => console.error('file reading was aborted');
    reader.onerror = () => console.error('file reading has failed');
    reader.onload = ({target}) => {
      let {result} = target;
      setImage(result);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  };
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const handleNext = () => {
    if (!name) {
      alert('Please enter a Name');
      return;
    }
    history.push('skills-knowledge');
  };

  return (
    <>
      <Progress stage={0} numStages={(questionThemes?.length ?? 0) + 2} />
      <div className='panel'>
        <section>
          <h2>Tell us about yourself</h2>
          <p>Please be as honest as possible.</p>
          <p>
            Your answers will help us tailor the course to your interests and understand what is
            important to you.
          </p>
        </section>
      </div>

      <label htmlFor='name'>Name *</label>
      <input
        type='text'
        name='name'
        id='name'
        value={name ?? ''}
        onChange={(event) => setName(event.target.value)}
      />

      <label htmlFor='who-am-i'>Who am I? Where am I from? What is important to me?</label>
      <textarea
        placeholder='Type here...'
        type='text'
        name='who-am-i'
        id='who-am-i'
        value={whoAmI ?? ''}
        onChange={(event) => setWhoAmI(event.target.value)}></textarea>

      <label htmlFor='why-am-i-here'>
        Why am I here and what would I like to get from the project?
      </label>
      <textarea
        placeholder='Type here...'
        type='text'
        name='why-am-i-here'
        id='why-am-i-here'
        value={whyAmIHere ?? ''}
        onChange={(event) => setWhyAmIHere(event.target.value)}></textarea>

      <h3>About Me</h3>
      <p>Please upload a photo, doodle or picture that represents who you are.</p>
      <div
        {...getRootProps({
          style: {
            border: '2px solid gray',
            borderRadius: 3,
            width: 164,
            height: 130,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDragActive ? 'lightgray' : 'white',
            cursor: 'pointer',
          },
        })}>
        <input {...getInputProps()} />
        {image ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: `url(${image})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
        ) : (
          <div
            style={{
              textAlign: 'center',
            }}>
            <img src={addPicture} alt='' />
            <div className='purple semibold'>Add a Picture</div>
          </div>
        )}
      </div>

      <div className='button-row'>
        <button className='button' onClick={handleNext}>
          Next
        </button>
      </div>
    </>
  );
};

export default AboutMe;
