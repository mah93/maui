import React, { useCallback, useRef } from 'react';
import {View, StyleSheet} from 'react-native';
import { OpacityContainer, useOverlay } from '../Overlay';
import ImageContainer, { Position } from './ImageContainer';
import ImageOverlay from './ImageOverlay';

interface ImageViewerProps {
  data: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
};

const ImageViewer: React.FC<ImageViewerProps> = props => {
  const {data, renderItem} = props;
  const {add} = useOverlay();
  const positionList = useRef<Position[]>([]);

  const handlePress = useCallback((index: number) => {
    add(<ImageOverlay positionList={positionList.current} data={data} currentIndex={index} /> , 'image-viewer');
  }, [])

  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        return (
          <ImageContainer 
            key={`ImageContainer_${index}`} 
            onPress={() => {
              handlePress(index)
            }}
            onLayout={(position) => {
              positionList.current.push(position);
            }}
          >
            {renderItem && renderItem(item, index)}
          </ImageContainer>
        )
      })}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})

export default ImageViewer;
