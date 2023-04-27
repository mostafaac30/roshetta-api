async function stats(req, res, next) {
  try {
    const { Model, query } = req;
    const { field } = query;
    const [results, total] = await Promise.all([
      Model.aggregate([
        {
          $group: {
            _id: {
              month: { $month: "$createdAt" },
              year: { $year: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
      ])
        .sort("_id.month")
        .exec(),
      ,
      Model.countDocuments(),
    ]);

    req.res_object = {
      message: "successfully retrieve data",
      success: true,
      results: results,
      notify: false,
      total: total,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { stats };
