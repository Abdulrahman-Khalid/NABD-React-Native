import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import Steps from 'react-native-steps';
import data from './FirstAidData';
import metadata from './metadata.json';

const stepIndicatorStyles = {
  stepIndicatorSize: 50,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: '#ff5768',
  separatorFinishedColor: '#ff5768',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#ff5768',
  stepIndicatorUnFinishedColor: '#aaaaaa',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 25,
  currentStepIndicatorLabelFontSize: 25,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 15,
  currentStepLabelColor: '#ff5768'
};

export default class StepIndicator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0
    };
    this.viewabilityConfig = { itemVisiblePercentThreshold: 40 };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.stepIndicator}>
          <Steps
            configs={stepIndicatorStyles}
            count={metadata[this.props.injury].count}
            direction="vertical"
            current={this.state.currentPage}
            //labels={data.data.map(item => item.title)}
          />
        </View>
        <FlatList
          style={{ flexGrow: 1 }}
          data={data[this.props.injury]}
          renderItem={this.renderPage}
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
        />
      </View>
    );
  }

  renderPage = rowData => {
    const item = rowData.item;
    return (
      <View style={styles.rowItem}>
        {/* <Text style={styles.title}>{item.title}</Text> */}
        <Text style={styles.body}>{item.body}</Text>
        <View style={styles.imageContainer}>
          <Image style={styles.imageStyle} source={item.image} />
        </View>
      </View>
    );
  };

  onViewableItemsChanged = ({ viewableItems }) => {
    const visibleItemsCount = viewableItems.length;
    if (visibleItemsCount !== 0) {
      this.setState({
        currentPage: viewableItems[visibleItemsCount - 1].index
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row-reverse',
    backgroundColor: '#ffffff'
  },
  stepIndicator: {
    marginVertical: 20, // 50
    paddingHorizontal: 20
  },
  rowItem: {
    marginVertical: 100, //space between list
    // alignContent: 'center',
    flex: 1,
    paddingVertical: 20
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: '#333333',
    paddingVertical: 16,
    fontWeight: '600',
    alignItems: 'center'
  },
  body: {
    flex: 1,
    fontSize: 35,
    color: '#606060',
    lineHeight: 35, //here
    // marginRight: 2,
    padding: 20, //here
    textAlign: 'center'
  },
  imageStyle: {
    margin: 10,
    borderWidth: 1,
    //borderColor:'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    borderRadius: 50
  },
  imageContainer: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    //margin : 10,
    borderWidth: 1.5,
    borderColor: 'white'
  }
});
