/**
 * 查询详情后: 转换数据结构
 * @param {*} payload
 */
function AfterFind(data) {
  // console.log(payload);
  data = data || {};
  const software = data.software || [];
  let items = { data: [], delete: [] };
  software.forEach((item) => {
    if (item.name && item.name != "") {
      items.data.push({ name: item.name });
    }
  });

  // console.log(items);
  data.software_items = items;
  return data;
}

/**
 * 数据保存前: 保存原始数据到历史记录
 * @param {*} payload
 */
function BeforeSave(payload) {
  payload = payload || {};
  if (!payload.id) {
    return [payload];
  }

  let data = Process("models.asset.Find", payload.id, {
    withs: { contact: {}, software: {} },
  });

  if (data && data.code && data.message) {
    log.Error("[Asset] BeforeSave Hook: %s", data.message);
    return [payload];
  }

  // 保存快照
  let res = Process("models.asset.snap.Save", {
    assert_id: payload.id,
    data: data,
  });

  if (res && res.code && res.message) {
    log.Error("[Asset] BeforeSave Hook: %s", res.message);
    return [payload];
  }
  // console.log(data);
  return [payload];
}

/**
 * 重置数据保存逻辑
 * @param {*} payload
 */
function Save(payload) {
  payload = payload || {};
  if (payload.id) {
    Process("models.asset.Delete", payload.id);
  }

  // 保存新数据
  const assert_id = Process("models.asset.Create", payload);
  if (assert_id && assert_id.code && assert_id.message) {
    log.Error("[Asset] Save: %s", assert_id.message);
    return assert_id;
  }

  // 保存软件
  const items = payload.software_items || { data: [], delete: [] };

  // 删除软件 (演示批量删除，也可根据 delete 字段删除)
  Process("models.software.DeleteWhere", {
    wheres: [{ column: "asset_id", value: assert_id }],
  });

  // 也可以使用批量添加处理器 Insert 添加
  items.data.forEach((item) => {
    if (item.name == "") {
      return;
    }
    Process("models.software.Save", { asset_id: assert_id, name: item.name });
  });

  return assert_id;
}
