
import Hero from '../components/Hero';
import PageTransition from '../components/PageTransition';
import About from '../components/About';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <PageTransition>
            <main>
                <Hero />
                <About />
                <Skills />
                <Education />
                <Contact />
            </main>
        </PageTransition>
    );
};

export default Home;
