import React from "react";
import { Card, Avatar, Row, Col } from "antd";
import { Link } from "react-router-dom";
import podImage1 from "../img/pod1.jpg"
import podImage2 from "../img/pod2.jpg" 

const { Meta } = Card;

export default function About() {
  return (
    <>
      <section className="w-full mt-20 py-12 md:py-24 lg:py-32 flex justify-center">
        <div className="container grid items-center gap-1 w-[90%] px-4 md:px-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold font-primary tracking-tighter sm:text-5xl xl:text-6xl/none">
              Crafting Exceptional Experiences
            </h1>
            <p className="max-w-[600px] font-primary text-gray-500 md:text-xl ">
              At Acme Ecommerce, we're passionate about creating high-quality products that enrich the lives of our customers. Our mission is to redefine the shopping experience through thoughtful design and uncompromising craftsmanship.
            </p>
          </div>
          <img
            alt="Hero"
            className="mx-auto aspect-[4/3] overflow-hidden rounded-xl object-cover sm:w-full"
            height="450"
            
            src={podImage1}
            width="650"
          />
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 ">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-[550px_1fr] lg:gap-12 xl:grid-cols-[650px_1fr]">
          <img
            alt="About"
            className="mx-auto aspect-[4/3] overflow-hidden rounded-xl object-cover sm:w-full"
            height="400"
            src={podImage2}
            width="550"
          />
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-primary">Our Story</h2>
            <p className="max-w-[600px] font-primary text-gray-500 md:text-xl lg:text-base xl:text-xl ">
              Acme Ecommerce was founded in 2015 by a team of passionate designers and engineers who saw an opportunity to revolutionize the online shopping experience. We believe that every product should be a work of art, crafted with meticulous attention to detail and a deep understanding of our customers' needs.
            </p>
            <p className="max-w-[600px] text-gray-500 md:text-xl lg:text-base xl:text-xl font-primary ">
              Our founders, Jane and John, have over 20 years of combined experience in the ecommerce industry. They've assembled a talented team of designers, engineers, and customer service experts who are dedicated to delivering exceptional products and experiences.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-primary" >What Makes Us Unique</h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl lg:text-base xl:text-xl  font-primary">
              At Acme Ecommerce, we believe that every product should be a work of art. We use only the finest materials and work with skilled artisans to ensure that each item we sell is of the highest quality.
            </p>
            <p className="max-w-[600px] text-gray-500 md:text-xl font-primary lg:text-base xl:text-xl ">
              Our commitment to sustainability is also a core part of our business. We source our materials responsibly and work to minimize our environmental impact at every stage of the production process.
            </p>
          </div>
          <div className="grid gap-6">
            <Card title="Exceptional Quality" bordered={false}>
              <p className="text-gray-500  font-primary">
                We use only the finest materials and work with skilled artisans to ensure that each product we sell is of the highest quality.
              </p>
            </Card>
            <Card title="Sustainable Practices" bordered={false}>
              <p className="text-gray-500  font-primary">
                We are committed to sustainability and work to minimize our environmental impact at every stage of the production process.
              </p>
            </Card>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 ">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-primary">What Our Customers Say</h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl lg:text-base xl:text-xl  font-primary" >
              Our customers are the heart of our business, and we're honored to receive such positive feedback about our products and services.
            </p>
          </div>
          <div className="grid gap-6">
            <Card>
              <Card.Meta
                description={(
                  <>
                    <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal font-primary">
                      “Acme Ecommerce has completely changed the way I shop online. The quality of their products is unmatched, and the customer service is truly exceptional.”
                    </blockquote>
                    <div className="mt-4 flex items-center gap-4">
                      <Avatar src="/placeholder-user.jpg" alt="Avatar">JD</Avatar>
                      <div>
                        <div className="font-medium font-primary">John Doe</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 font-primary">Verified Customer</div>
                      </div>
                    </div>
                  </>
                )}
              />
            </Card>
            <Card>
              <Card.Meta
                description={(
                  <>
                    <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal font-primary">
                      “I've been a loyal customer of Acme Ecommerce for years, and I can honestly say that their products are unparalleled in terms of quality and design.”
                    </blockquote>
                    <div className="mt-4 flex items-center gap-4 font-primary">
                      <Avatar src="/placeholder-user.jpg" alt="Avatar">JD</Avatar>
                      <div>
                        <div className="font-medium font-primary">Jane Doe</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 font-primary">Verified Customer</div>
                      </div>
                    </div>
                  </>
                )}
              />
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
