import React from 'react'
import Container from '../component/main/common/Container'
import { MdOutlineEmail, MdOutlineMapsHomeWork } from 'react-icons/md'
import { FaPhoneVolume } from 'react-icons/fa'

const ContactUs = () => {
  return (
    <div className='w-full h-auto'>
    <Container>
      <div className='flex flex-col gap-8 md:flex-row'>
        <div className='text-gray-700 text-3xl w-full md:w-2/3 flex-col gap-4 '>
        <h1>Contact Us</h1>
        <div className='flex flex-col gap-2 mt-2 w-full'>
          <div className='flex justify-between gap-4'>
            <div className='text-xs flex flex-col  w-1/2 gap-2'>
              <label htmlFor="fullName">Full Name*</label>
              <input type="text" placeholder='Full Name' className='border-2 outline-none p-2'/>
              <label htmlFor="phoneNumber">Phone Number *</label>
              <input type="text" placeholder='Phone Number' className='border-2 outline-none p-2' />
            </div>

            <div className='text-xs flex flex-col w-1/2 gap-2 '>
            <label htmlFor="email">Email *</label>
            <input type="text" placeholder='Email Address' className='border-2 outline-none p-2'/>
            <label htmlFor="subject">Subject *</label>
              <input type="text" placeholder='Subject' className='border-2 outline-none p-2' />
            </div>

          </div>
          <div className='flex flex-col'>
              <label htmlFor="message" className='text-xs'>Message *</label>
              <textarea name="message" id="" rows={5} className='border-2'></textarea>
          </div>
        </div>
        </div>

        <div className='text-gray-700 text-3xl w-full md:w-1/3'>
        <h1 className='truncate'>Get In Touch</h1>
        <div className='flex flex-col gap-8 mt-8 w-full'>
          <div className='flex gap-1 text-sm'>
          <MdOutlineMapsHomeWork />
          Address:
          <p className='text-gray-500'>{" "}Arayankavu <br />Kulayettikara P O<br/>Ernakulam,682315</p>
          </div>
          <div className='flex gap-1 text-sm'>
          <FaPhoneVolume />
           Phone:
          <p className='text-gray-500'>{" "}+91 9846522638<br/>+91 9446129062</p>
          </div>
          <div className='flex gap-1 text-sm'>
          <MdOutlineEmail />
           Email:
          <p className='text-gray-500'>{" "}mintleaves.online@gmail.com</p>
          </div>
        </div>
        </div>
      </div>
    </Container>
    </div>
  )
}

export default ContactUs
