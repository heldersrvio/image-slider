export default function newImageSlider(doc, frameId, sliderId, frameWidth, frameHeight) {
    const frame = doc.querySelector(`#${frameId}`);
    const slider = doc.querySelector(`#${sliderId}`);
    let currentImage = 0;
    let numberOfImages = getChildNodes(slider).length;

    function getChildNodes(parentNode) {
        return [...parentNode.childNodes].filter((node) => node.nodeType !== 3);
    }

    function getFirstChild(parentNode) {
        let firstChild = parentNode.firstChild;
        while (firstChild !== null && firstChild.nodeType === 3) {
            firstChild = firstChild.nextSibling;
        }
        return firstChild;
    }

    function setFrameStyle() {
        frame.style.cssText = `
            width: ${frameWidth}px;
            height: ${frameHeight}px;
            overflow: hidden;
        `;
    }

    function setImageSliderStyle() {
        slider.style.cssText = `
            width: ${frameWidth * getChildNodes(slider).length}px;
            height: ${frameHeight}px;
            display: flex;
        `;
    }

    function setImageContainerStyles() {
        [...getChildNodes(slider)].forEach((imageContainer) => {
            imageContainer.style.cssText = `
                position: relative;
                width: ${frameWidth}px;
                height: ${frameHeight}px;
                text-align: center;
                background-color: black;
            `;
        });
    }

    function centerImages() {
        [...getChildNodes(slider)].forEach((imageContainer) => {
            const image = getFirstChild(imageContainer);
            image.style.cssText = `
            margin: auto;
            position: absolute;
            top: 0; left: 0; bottom: 0; right: 0;
            `;
        });
    }

    function setStyles() {
        setFrameStyle();
        setImageSliderStyle();
        setImageContainerStyles();
        centerImages();
    }

    function updateNavigation() {
        [...document.querySelectorAll('.navigation-element')]
            .forEach((element) => {
                if (element.id === `navigation-element-${currentImage}`) {
                    element.style.backgroundColor = 'white';
                } else {
                    element.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                }
            });
    }

    function createNavigation() {
        const navigation = doc.createElement('div');
        navigation.id = 'navigation';
        navigation.style.cssText = `
            position: absolute;
            z-index: 99;
            display: flex;
            justify-content: space-between;
            background: transparent;
            left: ${frameWidth / 2 - Math.round(frameWidth * numberOfImages / 40)}px;
            top: ${frameHeight * 95 / 100}px;
            width: ${Math.round(frameWidth * numberOfImages / 40)}px;
            height: ${frameWidth / 70}px;
        `;
        for (let i = 0; i < numberOfImages; i++) {
            const navigationElement = doc.createElement('div');
            navigationElement.id = `navigation-element-${i}`;
            navigationElement.classList.add('navigation-element');
            navigationElement.style.cssText = `
                cursor: pointer;
                width: ${frameHeight / 80}px;
                height: ${frameHeight / 80}px;
                border-radius: 100%;
                background-color: rgba(255, 255, 255, 0.3);
            `;
            navigationElement.addEventListener('click', () => {
                slider.style.transform = `translate(-${i * frameWidth}px)`;
                currentImage = i;
                updateNavigation();
            });
            navigationElement.addEventListener('mouseover', () => {
                navigationElement.style.backgroundColor = 'white';
            });
            navigationElement.addEventListener('mouseout', () => {
                navigationElement.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                updateNavigation();
            });
            navigation.appendChild(navigationElement);
        }
        frame.insertBefore(navigation, frame.firstChild);
    }

    function createArrowButton() {
        const buttonRight = doc.createElement('button');
        buttonRight.textContent = '>';
        buttonRight.style.cssText = `
            cursor: pointer;
            position: absolute;
            top: ${frameHeight / 3}px;
            left: ${frameWidth * 19 / 20}px;
            z-index: 99;
            background-color: transparent;
            height: ${frameHeight / 3}px;
            width: ${frameWidth / 20}px;
            border: none;
            color: white;
            font-size: ${frameWidth / 22}px;
        `;
        
        buttonRight.addEventListener('click', () => {
            if (currentImage === 2) {
                return;
            }
            slider.style.transform = `translate(-${(currentImage + 1) * frameWidth}px)`;
            currentImage += 1;
            updateNavigation();
        });
        frame.insertBefore(buttonRight, frame.firstChild);

        const buttonLeft = doc.createElement('button');
        buttonLeft.textContent = '<';
        buttonLeft.style.cssText = `
            cursor: pointer;
            position: absolute;
            top: ${frameHeight / 3}px;
            left: ${frameWidth * 0.33 / 20}px;
            z-index: 99;
            background-color: transparent;
            height: ${frameHeight / 3}px;
            width: ${frameWidth / 20}px;
            border: none;
            color: white;
            font-size: ${frameWidth / 22}px;
        `;
        
        buttonLeft.addEventListener('click', () => {
            if (currentImage === 0) {
                return;
            }
            slider.style.transform = `translate(-${(currentImage - 1) * frameWidth}px)`;
            currentImage -= 1;
            updateNavigation();
        });
        frame.insertBefore(buttonLeft, frame.firstChild);
    }

    setStyles();
    createArrowButton();
    createNavigation();
    updateNavigation();
}
