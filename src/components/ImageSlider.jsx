import { useState, useEffect, useRef } from 'react';

// MUI Components
import { Box, Typography } from "@mui/material";

const ImageList = ({ imageList, loadingText }) => {
    const endIndex = imageList.length;

    let indices = [];

    const [currentIndex, setCurrentIndex] = useState(0);
    const wrapperRef = useRef();

    // Styles
    const styles = {
        boxStyle: {
            paddingTop: 5,
            paddingBottom: 2,
        },
        wrapperStyle: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            rowGap: 20
        },
        smallImg: {
            width: 128
        },
        mediumImg: {
            width: 256
        },
        largeImg: {
            width: 512
        },
        indexerWrapper: {
            display: 'flex',
            gap: 15
        },
        indexer: {
            height: 12,
            width: 12,
            borderRadius: '50%',
            border: '1px solid #444',
            cursor: 'pointer'
        },
        loadingText: {
            fontSize: 14,
            color: '#444'
        }
    };

    useEffect(() => {
        setCurrentIndex(0);

        setTimeout(() => {
            wrapperRef.current?.focus();
        }, 500)
    }, [imageList]);

    if (imageList.length) {
        for (let i = 0; i < endIndex; i++) {
            indices.push(i);
        }
    }

    return (
        <Box sx={styles.boxStyle}>
            {
                endIndex ?
                    <div style={styles.wrapperStyle}>
                        <img src={imageList[currentIndex]?.url} style={{ width: imageList[currentIndex]?.imageWidth }} loading={'lazy'}
                            alt={'Not loaded'} />
                        <div style={styles.indexerWrapper} ref={wrapperRef} tabIndex={-1}>
                            {indices.map(index =>
                                <div key={index} onClick={() => setCurrentIndex(index)}
                                    style={{ ...styles.indexer, background: index === currentIndex ? '#444' : '' }}>
                                </div>
                            )}
                        </div>
                    </div>
                    : <Typography style={styles.loadingText}> {loadingText} </Typography>
            }
        </Box>
    );
};

export default ImageList;