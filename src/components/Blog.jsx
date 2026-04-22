import React from 'react';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/resume';
import './Blog.css';

const Blog = () => {
    const featuredPosts = blogPosts.filter(post => post.featured);

    return (
        <section id="blog" className="blog">
            <motion.div
                className="blog-container container"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="section-title">Blog & Insights</h2>
                <p className="section-subtitle">Technical deep dives and project case studies</p>

                <div className="blog-grid">
                    {featuredPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            className="blog-card glass-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                            whileHover={{ y: -8 }}
                        >
                            <div className="blog-meta">
                                <span className="blog-date">{post.date}</span>
                                <span className="blog-readtime">{post.readTime}</span>
                            </div>
                            
                            <h3 className="blog-title">{post.title}</h3>
                            <p className="blog-excerpt">{post.excerpt}</p>
                            
                            <div className="blog-tags">
                                {post.tags.map((tag, i) => (
                                    <span key={i} className="blog-tag">{tag}</span>
                                ))}
                            </div>
                            
                            <div className="blog-footer">
                                <span className="blog-status">Coming Soon</span>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <div className="blog-cta">
                    <p className="blog-cta-text">
                        More articles coming soon! Follow me on{' '}
                        <a 
                            href="https://linkedin.com/in/abiruth-s" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="blog-cta-link"
                        >
                            LinkedIn
                        </a>
                        {' '}for updates.
                    </p>
                </div>
            </motion.div>
        </section>
    );
};

export default Blog;
