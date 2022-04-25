---
title: Combined graph in ASP.NET with OWC
date: 2009-09-14 11:49 +0800
description: It took me a while to find out how to get a hang of making graphs in ASP.NET combined with OWC # Add post description (optional)
img: ./owc-asp.jpg # Add image post (optional)
# fig-caption: # Add figcaption (optional)
tags: [code, .net, web-dev, dev] # add tag
---

It took me a while to find out how to get a hang of making graphs in
ASP combined with OWC. There aren't many places on the internet that
show, or have a good guide. I was having troubles with creating a
combined OWC graph in ASP and I finally worked it out. I thought I
would share. I've left some of the different methods and properties in
there, mostly the styling ones to give a better idea on how to style
your graph to suit you. The DataTable bit is in there also. If you want
to test it straight out you can replace that with an array of your
choosing. 

``` csharp
    const int XAxis = 0;
    const int YAxis = 1;

    DataTable dt = this.DataSource;

    ChAxis axis = null;
    ChAxis axis2 = null;
    ChSeries seriesValue = null;
    ChSeries seriesMoreValue = null;
    ChSeries seriesY2 = null;

    ChartSpace = this.GetBaseChartSpace();
    ChChart chart = ChartSpace.Charts[0];

    #region Grab the data from the database and put it in a couple of arrays

    List<object> listValues = new List<object>();
    List<object> listMoreValues = new List<object();
    List<object> dateList = new List<object>();
    List<object> listY2Values = new List<object>();

    foreach( DataRow row in dt.Rows )
    {
        dateList.Add(row["Date"]);
        listValues.Add(row["Value1"]);
        listMoreValues.Add(row["Value2"]);
        listY2Values.Add(row["ValueY2"]);
    }

    object [] dateArray = dateList.ToArray();
    object [] valueArray = listValues.ToArray();
    object [] moreValueArray = listMoreValues.ToArray();
    object [] y2Array = listY2Values.ToArray();

    #endregion

    #region Series data
    seriesValue = chart.SeriesCollection.Add(0);
    seriesValue.Caption = "Value Array";
    seriesValue.SetData( ChartDimensionsEnum.chDimCategories,
    Convert.ToInt32(ChartSpecialDataSourcesEnum.chDataLiteral), dateArray);
    seriesValue.SetData( ChartDimensionsEnum.chDimValues,
    Convert.ToInt32(ChartSpecialDataSourcesEnum.chDataLiteral), valueArray);
    seriesValue.Interior.Color = "#FF9E00";

    seriesMoreValue = chart.SeriesCollection.Add(1);
    seriesMoreValue.Caption = "More Value Array";
    seriesMoreValue.SetData( ChartDimensionsEnum.chDimValues,
    Convert.ToInt32(ChartSpecialDataSourcesEnum.chDataLiteral),
    moreValueArray);
    seriesMoreValue.Interior.Color = "#F7D708";
    #endregion

    #region Chart settings
    chart.Type = ChartChartTypeEnum.chChartTypeColumnClustered;
    chart.Interior.Color = "whitesmoke";
    chart.PlotArea.Interior.Color = "white";
    chart.Title.Caption = "The chart header";
    chart.HasLegend = true;
    chart.Legend.Position = ChartLegendPositionEnum.chLegendPositionBottom;
    #endregion

    #region value axis (Y Axis)
    chart.Axes[YAxis].Scaling.Minimum = 0;
    chart.Axes[YAxis].HasTitle = true;
    chart.Axes[YAxis].Title.Caption = "This is the Y-axis";
    chart.Axes[YAxis].HasMajorGridlines = true;
    chart.Axes[YAxis].HasMinorGridlines = true;
    chart.Axes[YAxis].MajorGridlines.Line.Color = "lightgrey";
    chart.Axes[YAxis].MinorGridlines.Line.Color = "#EEEEEE";
    chart.Axes[YAxis].HasTickLabels = true;
    #endregion

    #region date axis (X Axis)
    chart.Axes[XAxis].HasMajorGridlines = true;
    chart.Axes[XAxis].MajorGridlines.Line.Color = "lightgrey";
    chart.Axes[XAxis].HasMinorGridlines = false;
    chart.Axes[XAxis].HasTitle = true;
    chart.Axes[XAxis].Title.Caption = "Date";
    #endregion

    #region value axis (Y2 Axis)
    seriesY2 = chart.SeriesCollection.Add(0);
    seriesY2.Type = ChartChartTypeEnum.chChartTypeLine;
    seriesY2.SetData( ChartDimensionsEnum.chDimValues,
    Convert.ToInt32(ChartSpecialDataSourcesEnum.chDataLiteral), y2Array );
    seriesY2.Caption = "This is the Y2-axis";
    seriesY2.Line.Color = "#CE0000";
    seriesY2.Ungroup(true);

    axis2 =
    chart.Axes.Add(seriesY2.get\_Scalings(ChartDimensionsEnum.chDimValues));
    axis2.Scaling.Minimum = 0;
    axis2.HasMajorGridlines = false;
    axis2.Position = ChartAxisPositionEnum.chAxisPositionRight;
    axis2.HasTitle = true;
    axis2.Title.Caption = "Y2 caption";
    #endregion
```

See https://gist.github.com/spyn/83aebdb9b8ffb8e6a682

Some related links: MSDN Office Web Components Constants <http://msdn.microsoft.com/en-us/library/aa204179%28office.11%29.aspx>

There are probarly some other, better, controls out there.