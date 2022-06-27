import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import {Badge} from "react-native-maui";
import Section from '../components/Section';

export default function BadgeExample() {
  return (
    <View style={styles.container}>
      <Section title="基础样式">
        <Badge style={{ marginHorizontal: 5 }} number={2} />
        <Badge style={{ marginHorizontal: 5 }} number={10} />
        <Badge style={{ marginHorizontal: 5 }} number={102} />
      </Section>
      <Section title="自定义样式">
        <Badge style={{ marginHorizontal: 5 }} number={2} size={20} />
        <Badge style={{ marginHorizontal: 5 }} number={10} size={20}  />
        <Badge style={{ marginHorizontal: 5 }} number={102} size={20}  />
        <Badge style={{ marginHorizontal: 5 }} number={2} size={20} color={'#11659a'} />
        <Badge style={{ marginHorizontal: 5 }} number={100} size={20} color={'#11659a'} />
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
